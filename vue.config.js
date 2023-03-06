const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index:{
      //入口
      entry:'src/main.js'
    }
  },
  lintOnSave:false,//关闭语法检查
  devServer:{
    //设置启动端口
    port:8088
  }
})
