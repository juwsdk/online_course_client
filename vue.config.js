const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index:{
      entry:'src/main.js' //入口
    }
  },
  lintOnSave:false,//关闭语法检查
  devServer:{
    port:8088 //设置启动端口
  }
})
