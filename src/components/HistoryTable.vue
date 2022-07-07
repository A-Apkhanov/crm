<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(record, index) of records"
        :key="record.id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ formattedCurrency(record.amount) }}</td>
        <td>{{ formattedDate(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span
            class="white-text badge"
            :class="[ record.typeClass ]"
          >
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail-record/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import formatCurrency from '@/services/formatCurrency';
import formatDate from '@/services/formatDate';

export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  methods: {
    formattedCurrency(value) {
      return formatCurrency(value);
    },
    formattedDate(value) {
      return formatDate(value, 'datetime');
    },
  },
};
</script>
