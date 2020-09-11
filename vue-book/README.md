# vue-book

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# **代码目录**
- mock 模拟数据
- api 所有接口
- base 基础组件
- components 页面组件

# 开发思路
  1. 先写服务端，确保数据能正常返回
  2. 增加api 方法，实现调取数据功能
  3.在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件
  4. 写一个基础组件
   --创建一个.vue文件
   --在需要使用这个组件的父级中引用这个组件
   --在组件中注册
   --以标签的形式引入
## 页面级缓存
路由元信息meta
  <keep-Alive>
   <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-Alive>
## 下拉加载
- 默认每次给5条，前端告诉后台现在要从第几条开始给
- /page?offset=5

