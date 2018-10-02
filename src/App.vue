<template>
  <div id="app">
    <div class="layout">
      <div class="payments_container">
        <PaymentMethods
          containerClasses="paymentmethods_section"
          :paymentmethods="paymentmethods"
          :isLoading="isLoading"
          @onAccountChange="account = $event" />
      </div>
      <div class="deposit_container">
        <Deposit
          containerClasses="deposit_section"
          @onDeposit="fetchUserTransactions"
          :account="account" />
        <Transactions
          containerClasses="history_section"
          :transactions="transactions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Deposit, Transactions, PaymentMethods } from "./modules";
import NetellerService from "./services/neteller";

const service = new NetellerService();

export default {
  name: "app",
  components: {
    Deposit,
    PaymentMethods,
    Transactions
  },
  mounted() {
    this.fetchPaymentMethods();
    this.fetchUserTransactions();
  },
  methods: {
    fetchUserTransactions() {
      service.getUserTransactions().then(transactions => {
        this.transactions = transactions;
      });
    },
    fetchPaymentMethods() {
      service.getUserPaymentMethods().then(paymentmethods=>{
        this.paymentmethods = paymentmethods.methods;
        // ugly
        try {
          this.account = this.paymentmethods[0].accounts[0];
        } catch (error) {
          console.warn("Couldn't set an initial active account");
        }
      })
    }
  },
  data: () => ({
    paymentmethods: null,
    account: null,
    transactions: null
  })
};
</script>

<style lang="scss">
  @import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
  @import "./styles/settings.scss";
  @import "./styles/globals.scss";
</style>
