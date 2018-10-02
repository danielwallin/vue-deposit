<script>
import { Input, Spinner } from "./../components/";
import { getLogo } from "./../utils/helpers";

import NetellerService from "./../services/neteller";
const service = new NetellerService();

function initialState() {
  return {
    formdata: { amount: null, secureId: null, account: null },
    errors: {},
    isLoading: false,
    responseData: null
  };
}

export default {
  name: "deposit",
  props: {
    account: Object,
    containerClasses: String
  },
  watch: {
    // Whenever the account changes, this function will run so
    // we use this for resetting the form
    account: function(newAccount, oldAccount) {
      this.reset();
    }
  },
  components: { Input, Spinner },
  data: initialState,
  methods: {
    getLogo: getLogo,
    setResponseHtml() {
      const { txRefId, success } = this.responseData;

      if (success) {
        const { messages } = this.responseData;
        const data = messages
          .map(message => {
            return `<div class="response-item"><h3 class="response-label">${
              message.label
            }</h3><h4 class="response-value">${message.value}</h4></div>`;
          })
          .slice(0, -1)
          .join("");

        return `<div class="response">
          <h3 class="response-title heading">Success</h3>
          ${data}
        </div>
        `;
      }

      return `<div class="response response-failure">
            <h3 class="response-title heading">Something went wrong</h3>
            <div class="response-item"></div>
        </div>
      `;
    },
    reset() {
      Object.assign(this.$data, initialState());
    },
    deposit() {
      service.process(this.formdata).then(response=>{
        this.responseData = response;
        this.$emit("onDeposit");
      }).finally(()=>{
         this.isLoading = false;
      });
    },
    process() {
      this.isLoading = true;

      service.validate(this.formdata).then(res=>{
        const { success } = res;
        if (!success) {
          for (let index = 0; index < res.errors.length; index++) {
            const error = res.errors[index];
            this.errors[error.field] = error.msg;
          }
          this.isLoading = false;
        } else {
          this.deposit();
        }
      })
    },
    validate() {
      const { amount, secureId, account } = this.formdata;
      this.errors = {};

      // Client side validation, we should work with schemas instead
      for (const key in this.formdata) {
        const element = this.formdata[key];
        if (!element || element.length == 0) {
          this.errors[key] = `Required field`;
        }
        // Assuming all fields will only contain digits
        if (element && !element.match(/^\d+$/)) {
          this.errors[key] = `Please input a number`;
        }
      }

      if (Object.keys(this.errors).length == 0) {
        this.process();
      }
    }
  }
};
</script>

<template>
  <section :class="[containerClasses, 'deposit']">

        <!-- Response -->
        <div v-if="responseData" class="response-container">
          <div class="response-html" v-html="setResponseHtml()"></div>
          <button class="response-button" @click="reset">Ok</button>
        </div>

        <!-- Loading -->
        <div v-else-if="isLoading" class="spinner-container">
          <h3 class="heading">Loading</h3>
          <Spinner color="#333" :style="{width: '35px', height: '35px', margin: '0 auto'}" />
        </div>

        <!-- Form -->
        <div v-else class="deposit-form">
          <h3 class="heading">Deposit</h3>
          <div class="deposit-info">
            <div class="logo" v-if="account" v-html="getLogo(account.type, account.cardType)"></div>
            <h4 class="deposit-accounttype" v-if="account">{{ account.cardType && account.cardType.toUpperCase() || account.type && account.type.toUpperCase() }}</h4>
            <h4 class="deposit-maskedaccount" v-if="account">{{ account.maskedAccount }}</h4>
          </div>

          <!-- Show the form only if the type is Neteller (for now) -->
          <form
              v-if="account.type=='neteller'"
              class="container"
              @submit.prevent="validate">
              <div class="deposit-fields">
                  <Input
                    label="Amount"
                    :value="formdata.amount"
                    :error="(errors.amount && errors.amount.length) && errors.amount"
                    containerClasses="deposit-inputcontainer"
                    labelContainerClasses="deposit-labelcontainer"
                    classes="deposit-input"
                    @onChange="formdata.amount = $event"
                  />
                  <Input
                    label="Neteller-ID"
                    :value="formdata.account"
                    :error="(errors.account && errors.account.length) && errors.account"
                    containerClasses="deposit-inputcontainer"
                    labelContainerClasses="deposit-labelcontainer"
                    classes="deposit-input"
                    @onChange="formdata.account = $event"
                  />
                  <Input
                    label="Secure-ID"
                    :value="formdata.secureId"
                    :error="(errors.secureId && errors.secureId.length) && errors.secureId"
                    containerClasses="deposit-inputcontainer"
                    labelContainerClasses="deposit-labelcontainer"
                    classes="deposit-input"
                    @onChange="formdata.secureId = $event" />
                    <div style="text-align: left; margin-top: 1rem">
                      <span style="display: block">netellerId: 453501020503</span>
                      <span style="display: block">secureId: 908379</span>
                    </div>
              </div>
              <div class="deposit-amount">
                <button type="submit" class="deposit-amount-button">
                  <span>Deposit</span>
                </button>
              </div>
          </form>
          <div v-else>
            N/A
          </div>
        </div>
  </section>
</template>

<style lang="scss">
@import "./../styles/settings.scss";

.spinner {
  &-container {
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.response {
  &-item {
    display: flex;
    justify-content: space-between;
  }
  &-value {
    font-weight: 400;
  }

  &-title.heading {
    color: $successcolor;
    text-align: center;
  }
  &-html {
    margin-bottom: 3rem;
  }
  &-button {
    border: 1px solid;
  }

  /**
   *
   * Failure
   *
   */
  

  &-failure {
    .response-title.heading {
      color: #333;
    }
  }
}

.deposit {
  &-amount {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-title.heading {
      margin-bottom: 0;
      font-weight: 500;
    }
    &-button {
      background: $successcolor;
      color: white;
      align-self: flex-end;
      transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }

  &-info {
    display: flex;
    align-items: center;
    .logo {
      margin-right: 1.5rem;
      display: flex;
      align-items: center;
    }
    strong {
      margin-right: 1.5rem;
    }
  }

  &-accounttype {
    margin-right: 0.5rem;
  }

  &-maskedaccount,
  &-accounttype {
    font-size: 1.4rem;
    font-weight: 400;
    text-align: left;
  }
  &-labelcontainer {
    display: flex;
    justify-content: space-between;
  }
  &-fields {
    display: flex;
    flex-direction: column;
    > div:nth-child(even) {
      margin: -1px 0;
    }
  }
  &-errorcontainer {
    color: $dangercolor;
  }
  &-inputcontainer {
    border: 1px solid #d7d7d7;
    padding: 0.5em 1em;
    text-align: left;
    transition: box-shadow 0.3s ease 0s;
    &.active {
      margin: 0;
    }
    &.has-errors {
      .deposit-labelcontainer span:nth-child(2) {
        color: $dangercolor;
      }
    }
    input {
      border: 0;
      padding: 0;
      margin: 0;
    }
  }
  &-input {
    font-size: 1.2rem;
    border: 1px solid #000;
    padding: 0.5em 1em;
    margin-bottom: 1rem;
    outline: none;
    width: 100%;
    background-color: transparent;
  }
  &-error {
    color: $dangercolor;
  }
}
</style>
