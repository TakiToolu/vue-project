<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" @click="goBack"></i>
    </div>
</template>
<script>
    export default {
      props:{
        back:{
          type:Boolean,
          default:false,
        }
      },
      methods:{
        goBack(){
          this.$router.go(-1);
        },
      }

    }
</script>
<style scoped type="text/css" lang="less">

.header{

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color:lightblue;
  height: 40px;
  /*clear:both;*/
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  i{
    position: absolute;
    left: 0;
    font-size: 20px;
  }
}
</style>
