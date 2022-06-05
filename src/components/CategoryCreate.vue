<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="handleSubmitForm">
        <div class="input-field">
          <input
            id="create-name"
            type="text"
            v-model.trim="title"
            :class="{invalid: (v$.title.$dirty && v$.title.$invalid)}"
          >
          <!--                eslint-disable-next-line-->
          <label for="create-name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.$invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="create-limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: (v$.limit.$dirty && v$.limit.$invalid)}"
          >
          <!--                eslint-disable-next-line-->
          <label for="create-limit">Лимит</label>
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
          Создать
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
  name: 'CategoryCreate',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: '',
      limit: 100,
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
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  methods: {
    async handleSubmitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        title: this.title[0].toUpperCase() + this.title.slice(1),
        limit: this.limit,
      };

      try {
        await this.$store.dispatch('createCategory', formData);
        this.title = '';
        this.limit = 100;
        this.v$.$reset();
        this.$message('Категория была создана');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
