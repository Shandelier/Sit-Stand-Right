module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },

  transpileDependencies: ["vuetify"],

  chainWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.output.filename("[name].[hash].js").end();
    }
  }
};
