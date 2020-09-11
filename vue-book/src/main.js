import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex);
import store from '@/vuex/store.js'
import VueAwesomeSwiper from 'vue-awesome-swiper';//导入轮播图插件
// import 'swiper/css/swiper.css'  //require也可以
import 'swiper/swiper-bundle.css'
import 'babel-polyfill'
import  VueLazyload from 'vue-lazyload'//图片懒加载

Vue.use(VueAwesomeSwiper);//注册轮播图组件为全局变量

Vue.config.productionTip = false;
Vue.use(VueLazyload,{//使图片懒加载功能为全局变量
  preload:1.3,
  error:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598982553852&di=06f236d48161a91489843d235866ead8&imgtype=0&src=http%3A%2F%2Fwww.lanhesheji.com%2Fuploadfile%2F2015%2F0921%2F20150921095146338.png',
  loading:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598982638490&di=95720a01cfa9fbe22c97d2aaccd9a789&imgtype=0&src=http%3A%2F%2Fimg.ui.cn%2Fdata%2Ffile%2F4%2F9%2F2%2F2108294.gif',
  attempt:1
})
//在进入路由之前每一次都会执行  全局钩子 有拦截功能
router.beforeEach(function (to,from,next) {
  // console.log(to);
  document.title=to.meta.title;
  if(to.path==='list'){
    //next(pah{:'/add})
    next();
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

})


