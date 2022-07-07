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
      v-else-if="!records.length"
    >
      Записей пока нет.
      <router-link to="/record">
        Добавьте первую запись.
      </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import LoaderIcon from '@/components/app/LoaderIcon.vue';

export default {
  name: 'HistoryView',
  components: { LoaderIcon, HistoryTable },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    records() {
      const { records } = this.$store.getters;
      return records
        .map((record) => ({
          ...record,
          categoryName: this.categories
            .find((category) => category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }))
        .reverse();
    },
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    await this.$store.dispatch('getRecords');
    this.isLoading = false;
  },
};
</script>
