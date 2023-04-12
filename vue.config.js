const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: { entry: 'src/main.js' },//入口
    /* devServer: {//防止报错 websocket connections failed
      host: '0.0.0.0',
      port: 3000,
      client: { webSocketURL: 'ws://0.0.0.0:3000/ws' },
      headers: { 'Access-Control-Allow-Origin': '*' }
    } */
  },
  lintOnSave: false,//关闭语法检查
  devServer: {
    port: 8088 //设置启动端口
  }
})
