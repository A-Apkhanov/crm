<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur of currencies"
              :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ formattedCurrency(this.rates[cur]) }}</td>
              <td>{{ formattedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '@/services/formatDate';
import formatCurrency from '@/services/formatCurrency';

export default {
  name: 'HomeCurrency',
  data() {
    return {
      rates: this.$store.getters.exchangeRates.rates,
      date: this.$store.getters.exchangeRates.date,
      currencies: ['RUB', 'EUR', 'USD'],
    };
  },
  methods: {
    formattedCurrency(value) {
      return formatCurrency(1 / value);
    },
  },
  computed: {
    formattedDate() {
      return formatDate(this.date, 'date');
    },
  },
};
</script>
