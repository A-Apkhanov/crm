<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <form>
              <div class="input-field">
                <input
                  id="create-name"
                  type="text"
                >
                <!--                eslint-disable-next-line-->
                <label for="create-name">Название</label>
                <span class="helper-text invalid">Введите название</span>
              </div>

              <div class="input-field">
                <input
                  id="create-limit"
                  type="number"
                >
                <!--                eslint-disable-next-line-->
                <label for="create-limit">Лимит</label>
                <span class="helper-text invalid">Минимальная величина</span>
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
      </div>
    </section>
  </div>
</template>
