<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select id="category">
            <option>Category</option>
          </select>
          <!--                eslint-disable-next-line-->
          <label for="category">Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="edit-name"
          >
          <!--                eslint-disable-next-line-->
          <label for="edit-name">Название</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input
            id="edit-limit"
            type="number"
          >
          <!--                eslint-disable-next-line-->
          <label for="edit-limit">
            Лимит
          </label>
          <span class="helper-text invalid">LIMIT</span>
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
export default {
  name: 'CategoryEdit',
};
</script>
