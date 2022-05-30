<template>
  <form
    class="card auth-card"
    @submit.prevent="handleSubmitForm"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: (v$.email.$dirty && v$.email.$invalid)}"
        >
        <!--                eslint-disable-next-line-->
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$dirty && v$.email.$invalid"
        >
          Аккаунт не найден. Повторите попытку или зарегистрируйтесь.
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: (v$.password.$dirty && v$.password.$invalid)}"
        >
        <!--                eslint-disable-next-line-->
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.$invalid"
        >
          Введен не верный пароль
        </small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import messages from '@/services/messages';

export default {
  name: 'LoginView',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: {
        email,
        required,
      },
      password: {
        minLength: minLength(6),
        required,
      },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async handleSubmitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
