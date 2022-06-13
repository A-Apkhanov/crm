<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <LoaderIcon v-if="isLoading" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      Категорий пока нет.
      <router-link to="/categories">
        Добавить новую категорию.
      </router-link>
    </p>

    <form
      class="form"
      v-else
      @submit.prevent="handleSubmitForm"
    >
      <div class="input-field">
        <select
          id="category"
          ref="select"
          v-model="category"
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

      <p>
        <label for="income">
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            id="income"
            v-model="type"
          >
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label for="expense">
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            id="expense"
            v-model="type"
          >
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: (v$.amount.$dirty && v$.amount.$invalid)}"
        >
        <!--                eslint-disable-next-line-->
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && v$.amount.$invalid"
        >
          Минимальное значение {{ v$.amount.minValue.$params.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: (v$.description.$dirty && v$.description.$invalid)}"
        >
        <!--                eslint-disable-next-line-->
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && v$.description.$invalid"
        >
          Введите описание
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
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import { mapGetters } from 'vuex';
import LoaderIcon from '@/components/app/LoaderIcon.vue';
import formatCurrency from '@/services/formatCurrency';

export default {
  name: 'RecordView',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      select: null,
      category: null,
      type: 'outcome',
      amount: 1,
      description: '',
      isLoading: true,
    };
  },
  validations() {
    return {
      description: { required },
      amount: {
        minValue: minValue(1),
        required,
      },
    };
  },
  async mounted() {
    await this.$store.dispatch('getCategories');
    this.isLoading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(['info']),
    categories() {
      return this.$store.getters.categories;
    },
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async handleSubmitForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        const formData = {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        };
        const newBill = this.type === 'income'
          ? this.info.bill + this.amount
          : this.info.bill - this.amount;

        try {
          await this.$store.dispatch('createRecord', formData);
          await this.$store.dispatch('updateInfo', { bill: newBill });
          this.$message('Запись успешно создана');
          this.v$.reset();
          this.amount = 1;
          this.description = '';
          // eslint-disable-next-line no-empty
        } catch (e) {}
      } else {
        const difference = formatCurrency(this.amount - this.info.bill);
        this.$message(
          `Недостаточно средств на счете (${difference})`,
        );
      }
    },
  },
  components: {
    LoaderIcon,
  },
};
</script>
