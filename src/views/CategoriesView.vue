<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <LoaderIcon v-if="isLoading" />
      <div
        class="row"
        v-else
      >
        <CategoryCreate />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @update-category="updateCategory"
        />
        <p
          v-else
          class="center"
        >
          Категорий пока нет
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import LoaderIcon from '@/components/app/LoaderIcon.vue';

export default {
  name: 'CategoriesView',
  data() {
    return {
      isLoading: true,
      updateCount: 0,
    };
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    this.isLoading = false;
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    updateCategory() {
      // eslint-disable-next-line no-plusplus
      this.updateCount++;
    },
  },
  components: {
    CategoryCreate, CategoryEdit, LoaderIcon,
  },
};
</script>
