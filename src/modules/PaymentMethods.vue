<script>
import { capitalizeFirstLetter, getLogo } from './../utils/helpers';
import { Spinner } from './../components/';

export default {
  name: "paymentmethods",
  props: {
    paymentmethods: Array,
    containerClasses: String,
    onAccountClick: Function,
    isLoading: Boolean
  },
  components: { Spinner },
  data: () => ({
    activeAccountIndex: 0,
    activeAccordion: 0
  }),
  methods: {
    capitalizeFirstLetter: capitalizeFirstLetter,
    getLogo: getLogo,
    setActive({account, index}) {
      this.$emit("onAccountChange", account);
      this.activeAccountIndex = index;
    },
    toggle(index) {
      this.activeAccordion = this.activeAccordion==index ? null : index;
    }
  }
};
</script>

<template>
  <section :class="[containerClasses, 'accounts']">
    <h3 class="heading">Payment methods</h3>
    <ul class="accounts-list">
      <li
        :class="['accordion', activeAccordion==index ? 'accordion-active' : '']"
        v-for="(account, index) in paymentmethods" :key="index">
        <!-- Accounts type -->
        <div class="toggler" @click="toggle(index)">
          <h3>{{ account.providerType }} ACCOUNTS</h3>
          <i :class="['fas', activeAccordion==index ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </div>
        <ul>
          <!-- Accounts -->
          <li
            v-if="account.accounts.length > 0"
            v-for="(data, index) in account.accounts"
            :class="['accounts-item', activeAccountIndex==index && 'active']"
            @click="setActive({account:data, index})"
            :key="index">
            <h3>{{ data.cardType ? capitalizeFirstLetter(data.cardType) : '-' }}</h3>
            <div class="logo" v-html="getLogo(data.type, data.cardType)"></div>
            <p>{{ data.maskedAccount ? data.maskedAccount : '-' }}</p>
            <a class="accounts-item-delete">Delete</a>
          </li>
          <li v-if="account.accounts.length==0" class="accounts-item no-items">
            No accounts added
          </li>
        </ul>
      </li>
    </ul>

    <!-- Add account -->
    <div class="accounts-add">
      <div class="accounts-add-container">
        <i class="accounts-add-icon fas fa-plus"></i>
        <h3 class="accounts-add-heading">Add Card / Account</h3>
      </div>
      <div class="accounts-add-cards">
        <img style="width: 25px" src="data:image/png;base64,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"/>
        <i class="fab fa-cc-visa"></i>
        <i class="fab fa-cc-mastercard"></i>
        <i class="fab fa-cc-paypal"></i>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>

@import "./../styles/settings.scss";

.heading {
  margin-bottom: 0;
  padding: 2rem;
}

.accordion {
  &-active .toggler {
    background: #f1f1f1;
  }
  &:first-child .toggler {
    border-top: 1px solid #f3f3f3;
  }
  .toggler h3 {
    font-weight: 500;
  }
  &-active ul {
    display: block!important;
  }
  ul {
    max-height: 200px;
    overflow-y: auto;
    display: none;
  }
  .toggler {
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: 1px solid #f3f3f3;
  }
}
.accounts {
  &-add {
    display: flex;
    align-items: center;
    padding: 2rem;
    justify-content: space-between;
    margin-top: 3rem;

    &-icon {
      background: $successcolor;
      padding: 4px 5px;
      color: white;
      border-radius: 15px;
    }

    &-cards {
      display: flex;
      align-items: center;
    }

    &-heading {
      color: $successcolor;
      cursor: pointer;
    }

    &-cards > * {
      font-size: 1.8rem;
      margin-left: .5rem;
    }

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-heading {
      margin: 0;
      line-height: 1em;
      margin-left: .5rem;
      text-transform: uppercase;
    }
  }

  &-list {
    text-align: left;
    flex-direction: column;
    max-height: 70vh;
    overflow: hidden;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 1rem 2rem;
    border-bottom: 1px solid $bordercolor;
    transition: .15s ease background-color;
    &.no-items {
      text-align: center;
      cursor: default;
      &:hover {
        background: #fff;
      }
    }
    h3 {
      font-weight: 400;
      text-transform: uppercase;
      font-size: 1rem;
    }
    &-delete {
      text-align: right;
      color: $dangercolor;
    }
    > * {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &.active, &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
