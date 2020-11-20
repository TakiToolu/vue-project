import Vue from 'vue';
import Router from 'vue-router';
//为了代码分割，路由懒加载，需要的组件再打包而省略的原 一起打包的方式
// import Home from '@/components/Home.vue';
// import List from '@/components/List.vue';
// import Add from '@/components/Add.vue';
// import Collect from '@/components/Collect.vue';
// import Detail from '@/components/Detail.vue';

Vue.use(Router);

export default new Router({

  routes: [
    { path:'/',redirect:'/home'}, //重定向
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,
            title:'主页'}
    },
    //其中属性信息放在$route中，meta备注信息
    //取值：this.$route.meta.keepAlive
    { path:'/list',
      // component:List 原引入方式
      component:()=>import('../components/List.vue'),
      title:'列表'
    },
    { path:'/add',
      component:()=>import('../components/Add.vue'),
      title:'添加'
    },
    { path:'/collect',
      component:()=>import('../components/Collect.vue'),
      title:'购物车'

    },
    //detail/1 {bid：1} 路径参数 必须有但是可以随机
    { path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail',
      title:'详情'
    },
    // { path:'/book', component:List},
    { path:'*',redirect:'/home'}, //重定向
  ]
})
