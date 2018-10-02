export default class NetellerService {
  constructor() {
    this.baseUrl = "https://test-api.paymentiq.io/paymentiq/api/";
    this.userId = "TEST_EUR";
    this.merchantId = "1972";
  }

  async getUserPaymentMethods() {
    return await fetch(
      `${this.baseUrl}user/payment/method/${this.merchantId}/${
        this.userId
      }?locale=en&method=deposit&sessionId=123123`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        return response;
      });
  }

  async getUserTransactions() {
    return await fetch(
      `${this.baseUrl}user/transaction/${this.merchantId}/${
        this.userId
      }?locale=en&method=deposit&sessionId=123123`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        return response;
      });
  }

  async process({ secureId, amount, account }) {
    const body = JSON.stringify({
      account,
      secureId,
      amount,
      attributes: {},
      sessionId: "123123",
      merchantId: this.merchantId,
      storeAccount: true,
      userId: this.userId
    });

    return await fetch(`${this.baseUrl}neteller/deposit/process?locale=en`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        return response;
      });
  }
  async validate({ secureId, amount, account }) {
    const body = JSON.stringify({
      account,
      secureId,
      amount,
      attributes: {},
      sessionId: "123123",
      merchantId: this.merchantId,
      storeAccount: true,
      userId: this.userId
    });

    return await fetch(`${this.baseUrl}neteller/deposit/validate?locale=en`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: body
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        return response;
      });
  }
}
