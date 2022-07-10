<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        @click="handleClickRefresh"
        class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <LoaderIcon v-if="isLoading" />

    <div
      v-else
      class="row"
    >
      <HomeBill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import LoaderIcon from '@/components/app/LoaderIcon.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    await this.loadingData();
  },
  methods: {
    async handleClickRefresh() {
      this.isLoading = true;
      await this.loadingData();
    },
    async loadingData() {
      try {
        await this.$store.dispatch('fetchExchangeRates');
        // eslint-disable-next-line no-empty
      } catch (e) {}

      this.isLoading = false;
    },
  },
  components: {
    HomeBill, HomeCurrency, LoaderIcon,
  },
};
</script>
