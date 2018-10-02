<script>
export default {
  name: "transactions",
  props: {
    containerClasses: String,
    transactions: Array
  }
};
</script>

<template>
    <section :class="containerClasses">
        <h3 class="heading">Transaction history</h3>
        <ul class="transactions-list">
            <li v-if="transactions && transactions.transactions" class="transactions-item" v-for="(transaction, index) in transactions.transactions" :key="index">
                <div>
                    <h3 class="transactions-item-created">{{ transaction.created }}</h3>
                    <h3 class="transactions-item-type">{{ transaction.txType }}</h3>
                </div>
                <h3 class="transactions-item-amount">{{ transaction.txAmount }}</h3>
            </li>
            <li class="transactions-item-empty" v-else>
                No transactions
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
@import "./../styles/settings.scss";

.heading {
  padding-bottom: 2rem;
}

.transactions {
  &-list {
    max-height: 200px;
    overflow-y: auto;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $bordercolor;
    &:last-child {
      border: none;
    }
    &-amount,
    &-type {
      font-weight: 400;
    }
    > div {
      text-align: left;
    }
  }
}
</style>
