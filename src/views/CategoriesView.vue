<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created-new-category="addNewCategory" />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/app/CategoryCreate.vue';
import CategoryEdit from '@/components/app/CategoryEdit.vue';

export default {
  name: 'CategoriesView',
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
  },
  components: {
    CategoryCreate, CategoryEdit,
  },
};
</script>
