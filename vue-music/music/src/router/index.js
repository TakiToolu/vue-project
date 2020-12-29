import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import Audio from '@/components/audioPlay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'home'},
    {
      path: '/home',
      name: 'home',
      component:Home,
      children:[
        {
          path:'/home/audio',
          name:'audio',
          component:Audio,
        },
        {
          path:'/home/hot',
          name:'hot',
          component: ()=>import('../components/hot.vue')
        },
      ]
    }
  ]
})
