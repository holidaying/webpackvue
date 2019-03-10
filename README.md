
## node建工程webpack4.x、vue2.x

### 1.新建工程
```
 npm init;
```
会生成package.json和package-lock.json.

### 2.webpack安装使用
```
 npm install webpack --save-dev,
 npm install webpack-cli --save-dev,
--- 1、局部使用  node_modules/.bin/webpack src/01/index.js src/01/bundle.js
--- 1、使用package script标签 webpack --mode development --progress --colors --config ./build/webpack.base.conf.js

```

### 3.webpack-dev-server安装使用
```
npm install --save-dev webpack-dev-server
webpack-dev-server --mode development --progress
 --colors --config ./build/webpack.base.conf.js
```

### 4.webpack热更新安装使用
```
var webpack = require("webpack");
new webpack.HotModuleReplacementPlugin(),
```

### 5.css代码分离
```
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css 单独打包
new ExtractTextPlugin("css/[name].css"),

webpack4.x以上，webpack发布环境自动压缩，推荐使用mini-css-extract-plugin
npm i mini-css-extract-plugin
```

### 6.babel安装使用
```
npm install --save-dev babel-core babel-loader babel-preset-es2015
需要用babel命令，则需要安装 npm install babel-cli
```
### 7.vue-loader的安装使用
```
npm i vue vue-loader vue-template-compiler --save-dev
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

```
### 8.vue过滤器、指令
```
import directive from "./directive";
import filter from "./filter"
var common = {
    install:(Vue)=>{
        directive(Vue);
        filter(Vue);
    }
}
if (typeof exports == "object") {
	module.exports = common;
} else if (typeof define == "function" && define.amd) {
	define([], function() {
		return common;
	});
} else if (window.Vue) {
	Vue.use(common);
}
```

### 9.vue-router、beforeEach
```
//路由设置
var router = (window.$router = new VueRouter({
	routes: routerConfig
}));
router.beforeEach((to,from,next)=>{
    if(to.name=="bar"){
        window.notify("this is bar componets","warning");
        return
    }
    next()
})
```
### 9.router.addRouters
```
import addRouters from "./router/addRouters.js"

//路由设置
var router = (window.$router = new VueRouter({
	routes: routerConfig
}));
router.addRoutes(addRouters);
```
### 10.webpack.DefinePlugin设置环境变量
```
  new webpack.DefinePlugin({
			"$env": "development",
			"$version":JSON.stringify("v1.0.0")
		}),
	],
    注意要json转换，否则容易解析报错
```
### 11.打包部署、拆分webpack-dev、webpack-publish
```
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

开发环境不需要打包压缩
生产环境需要打包压缩
```
### 12.node、gulp服务上传




