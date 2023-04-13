const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: { entry: 'src/main.js' },//入口

  },
  lintOnSave: false,//关闭语法检查
  devServer: {
    port: 8088,//设置启动端口
    //以下设置防止报websocket错
    host: '0.0.0.0',
    client: {
      webSocketURL: 'ws://0.0.0.0:8088/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }

})
