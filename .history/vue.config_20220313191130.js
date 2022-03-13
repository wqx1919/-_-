   
var webpack = require('webpack')
module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
	lintOnSave:false, //关闭语法检查
  devServer:{
    // proxy:"https://www.qidian.com/search?kw=斗破苍穹"
    proxy: {
      // '/api': {// 匹配所有以 '/api1'开头的请求路径
      //   target: 'https://www.qidian.com',// 代理目标的基础路径
      //   changeOrigin: true,
      //   pathRewrite: {'^/api': ''}
      // },
      // '/api2': {// 匹配所有以 '/api1'开头的请求路径
      //   target: 'https://www.baidu.com',// 代理目标的基础路径
      //   changeOrigin: true,
      //   pathRewrite: {'^/api2': '/'}
      // },
      // '/api3': {// 匹配所有以 '/api1'开头的请求路径
      //   target: 'http://m.kugou.com/',// 代理目标的基础路径
      //   changeOrigin: true,
      //   pathRewrite: {'^/api3': ''}
      // },
      '/api8': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://api.easou.com/api/bookapp/searchdzh.m?word=',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api8': ''}
      }
  },

  },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            // Semantic-UI
            semantic: 'semantic-ui-css',
            Semantic: 'semantic-ui-css',
            'semantic-ui': 'semantic-ui-css'
        })]
}
  // rules:[
  //   {
  //     // text:/\/less$/,
  //     // loader:'style-loader!css-loader!less-loader'
  //     test: /\.sass$/,
  //     loaders: ['style', 'css', 'sass']
  //   }
  // ]
  
  
}
