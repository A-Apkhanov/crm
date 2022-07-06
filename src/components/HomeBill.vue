<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p
          v-for="cur of currencies"
          :key="cur"
          class="currency-line"
        >
          <span>
            {{ getCurrencyAccount(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import formatCurrency from '@/services/formatCurrency';

export default {
  name: 'HomeBill',
  data() {
    return {
      currencies: ['RUB', 'EUR', 'USD'],
    };
  },
  methods: {
    getCurrencyAccount(currency) {
      const bill = this.$store.getters.info.bill || 0;
      const currencyAccount = bill
        * this.$store.getters.exchangeRates.rates[currency];
      return formatCurrency(currencyAccount, currency);
    },
  },
};
</script>
