<template>
    <div class="footer">
      <router-link to="/home" type="button">
        <i class="iconfont icon-shouye"></i>
        首页
      </router-link>
      <router-link to="/list" type="button">
        <i class="iconfont icon-list-2-copy"></i>
        列表页
      </router-link>
      <router-link to="/collect" type="button">
        <i class="iconfont icon-shoucang"></i>
        收藏页
      </router-link>
      <router-link to="/add" type="button">
        <i class="iconfont icon-tianjia"></i>
        添加页
      </router-link>

    </div>
</template>
<script>

    export default {}
</script>
<style scoped lang="less">
.footer{
  position: fixed;
  left:0px;
  bottom: 0px ;
  width: 100%;
  height: 50px;
  display:flex;
  border-top:1px solid gray;
  a{
    display: flex;
    color: cadetblue;
    flex-direction: column;
    flex: 1;
    align-items:center;
    justify-content: center;


  }
  a.router-link-active{
    color:forestgreen;
  }
}
</style>
