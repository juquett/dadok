module.exports = {
    devServer: {
      proxy: {
        '/login': {
          target: 'http://172.16.111.42:3000',
          changeOrigin: true,
          secure: false,
          pathRewrite: { '^/login': '/login' }
        }
      }
    }
  };
  