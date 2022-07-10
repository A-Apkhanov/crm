<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form
      class="form"
      @submit.prevent="handleSubmitForm"
    >
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: (v$.name.$dirty && v$.name.$invalid)}"
        >
        <!--                eslint-disable-next-line-->
        <label for="description">Имя</label>
        <span
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.$invalid"
        >
          Введите имя.
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
</template>

<script>
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default {
  name: 'ProfileView',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: '',
    };
  },
  validations() {
    return {
      name: { required },
    };
  },
  mounted() {
    this.name = this.$store.getters.info.name;
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
  methods: {
    async handleSubmitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        await this.$store.dispatch('updateInfo', { name: this.name });
        this.$message('Имя успешно обновлено');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
