export default {
  install(app) {
    const properties = app.config.globalProperties;
    properties.$message = (html) => {
      // eslint-disable-next-line no-undef
      M.toast({ html, displayLength: 2000 });
    };
    properties.$error = (html) => {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[Ошибка]: ${html}`, displayLength: 2000 });
    };
  },
};
