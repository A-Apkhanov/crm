<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas />
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
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'HistoryView',
  components: { LoaderIcon, HistoryTable, VPagination },
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: true,
      lengthRecords: 0,
    };
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    await this.$store.dispatch('getRecords');
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

    this.isLoading = false;
  },
};
</script>
