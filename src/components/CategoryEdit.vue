<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="handleSubmitForm">
        <div class="input-field">
          <select
            id="category"
            ref="select"
            v-model="current"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <!--                eslint-disable-next-line-->
          <label for="category">Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="edit-name"
            v-model.trim="title"
            :class="{invalid: (v$.title.$dirty && v$.title.$invalid)}"
          >
          <!--                eslint-disable-next-line-->
          <label for="edit-name">
            Название
          </label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.$invalid"
          >
            Введите новое название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="edit-limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: (v$.limit.$dirty && v$.limit.$invalid)}"
          >
          <!--                eslint-disable-next-line-->
          <label for="edit-limit">
            Лимит
          </label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.$invalid"
          >
            Минимальный лимит {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';

export default {
  name: 'CategoryEdit',
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    };
  },
  validations() {
    return {
      title: { required },
      limit: {
        minValue: minValue(100),
        required,
      },
    };
  },
  watch: {
    current(categoryId) {
      const { title, limit } = this.categories.find((category) => category.id === categoryId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async handleSubmitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        id: this.current,
        title: this.title[0].toUpperCase() + this.title.slice(1),
        limit: this.limit,
      };

      try {
        await this.$store.dispatch('updateCategory', formData);
        this.$message('Категория успешно обновлена');
        this.$emit('updateCategory');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
