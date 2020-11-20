<template>
  <div id="app">
    <transition name="fadeIn">
        <!--    需要缓存的-->
        <keep-Alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-Alive>
    </transition>
    <transition name="fadeIn">
        <!--    正常的不需要缓存的访问下走下面-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';
  export default {
    name: 'App',

    components:{Tab},
    mounted () {

    },
    methods:{

    }
}
</script>

<style>
    *{margin: 0;padding: 0;}
    ul li{list-style: none;}
    input,button{-webkit-appearance: none;}
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      /*margin-top: 60px;*/
    }
    .content{
      position: fixed;
      left: 0;
      top: 40px;
      width: 100%;
      bottom: 50px;
      overflow: auto;

    }
  .fadeIn-enter{
    opacity:0;
  }
  .fadeIn-enter-active{
    transition:all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition:all 0.3s linear;
  }
</style>
