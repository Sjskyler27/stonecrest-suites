const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/public/style.scss";`,
      },
    },
  },
});
