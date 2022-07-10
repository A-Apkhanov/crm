<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ bill }}</h4>
    </div>

    <LoaderIcon v-if="isLoading" />

    <p
      class="center"
      v-else-if="!records.length"
    >
      Категорий пока нет.
      <router-link to="/categories">
        Добавить новую категорию.
      </router-link>
    </p>

    <section v-else>
      <div
        v-for="category of categories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ displayCurrency(category.spend) }} из {{ displayCurrency(category.limit) }}
        </p>
        <div
          class="progress"
          v-tooltip="category.tooltip"
        >
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width:category.progressPercent + '%' }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoaderIcon from '@/components/app/LoaderIcon.vue';
import formatCurrency from '@/services/formatCurrency';

export default {
  name: 'PlanningView',
  components: { LoaderIcon },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    categories() {
      const { categories } = this.$store.getters;
      return categories.map((category) => {
        const spend = this.records
          .filter((record) => record.categoryId === category.id)
          .filter((record) => record.type === 'outcome')
          .reduce((total, record) => total + +record.amount, 0);
        const percent = (100 * spend) / category.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        let progressColor;
        if (percent < 60) {
          progressColor = 'green';
        } else if (percent < 100) {
          progressColor = 'yellow';
        } else {
          progressColor = 'red';
        }

        const tooltipValue = category.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${
          formatCurrency(Math.abs(tooltipValue))}`;

        return {
          ...category,
          progressColor,
          progressPercent,
          spend,
          tooltip,
        };
      });
    },
    records() {
      return this.$store.getters.records;
    },
    bill() {
      const { info } = this.$store.getters;
      const bill = info ? info.bill : 0;
      return formatCurrency(bill);
    },
  },
  methods: {
    displayCurrency(currency) {
      return formatCurrency(currency);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('getCategories');
      await this.$store.dispatch('getRecords');
      // eslint-disable-next-line no-empty
    } catch (e) {}

    this.isLoading = false;
  },
};
</script>
