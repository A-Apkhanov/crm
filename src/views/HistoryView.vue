<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <HistoryChart
        :chart-data="chartData"
      />
    </div>

    <LoaderIcon v-if="isLoading" />

    <p
      class="center"
      v-else-if="!lengthRecords"
    >
      Записей пока нет.
      <router-link to="/record">
        Добавьте первую запись.
      </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <v-pagination
        v-model="page"
        :pages="pageCount"
        :range-size="1"
        active-color="#e57373"
        @update:modelValue="handleChangePage"
      />
    </section>
  </div>
</template>

<script>
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';

import HistoryTable from '@/components/HistoryTable.vue';
import LoaderIcon from '@/components/app/LoaderIcon.vue';
import HistoryChart from '@/components/HistoryChart';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'HistoryView',
  components: {
    LoaderIcon, HistoryTable, VPagination, HistoryChart,
  },
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: true,
      lengthRecords: 0,
      chartData: {},
    };
  },
  methods: {
    setup() {
      const { records, categories } = this.$store.getters;

      this.lengthRecords = records.length;

      this.setupPagination(records.map((record) => ({
        ...record,
        categoryName: categories
          .find((category) => category.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }))
        .reverse());

      this.chartData = {
        labels: categories.map((category) => category.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            backgroundColor: [
              '#F94144', '#90BE6D', '#F3722C', '#43AA8B', '#F8961E',
              '#4D908E', '#F9844A', '#577590', '#F9C74F', '#277DA1',
            ],
            data: categories
              .map((category) => records
                .reduce((total, record) => (
                  record.categoryId === category.id && record.type === 'outcome'
                    ? total + +record.amount : total
                ), 0)),
          },
        ],
      };
    },
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    await this.$store.dispatch('getRecords');

    this.setup();

    this.isLoading = false;
  },
};
</script>
