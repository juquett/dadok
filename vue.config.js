const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080 // 개발 서버 포트 설정
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL || 'http://localhost:8080')
        }
      })
    ]
  }
});
