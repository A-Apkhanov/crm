<template>
  <div>
    <LoaderIcon v-if="isLoading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          to="/history"
          class="breadcrumb"
        >
          История
        </router-link>
        <a
          class="breadcrumb"
          @click.prevent
        >
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[ record.typeClass ]"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ formattedCurrency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ formattedDate }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      class="center"
      v-else
    >
      Запись с id: <i>{{ $route.params.id }}</i> не найдена.
    </p>
  </div>
</template>

<script>
import LoaderIcon from '@/components/app/LoaderIcon.vue';
import formatCurrency from '@/services/formatCurrency';
import formatDate from '@/services/formatDate';

export default {
  name: 'DetailRecordView',
  components: { LoaderIcon },
  data() {
    return {
      isLoading: true,
      record: null,
    };
  },
  computed: {
    formattedCurrency() {
      return this.record && formatCurrency(this.record.amount);
    },
    formattedDate() {
      return this.record && formatDate(this.record.date, 'datetime');
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      const record = await this.$store.dispatch('getRecordById', id);
      if (record) {
        const category = await this.$store.dispatch('getCategoryById', record.categoryId);
        this.record = {
          ...record,
          categoryName: category.title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        };
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}

    this.isLoading = false;
  },
};
</script>
