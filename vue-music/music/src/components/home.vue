<template>
    <div class="index">
        <div class="head">
            <img :src="logo" class="organ-logo" />
            <div class="headLeft">
                <div class="foundation">{{ name }}</div>
            </div>
            <div class="headRight">
                <img :src="userImg" class="logo" />
            </div>
        </div>
        <div class="main">
            <router-view/>
<!--            <Lyric></Lyric>-->
<!--            <Audio></Audio>-->
        </div>
    </div>
</template>


<script>
    import logo from "@/assets/avatar_02.jpg";
    import Lyric from  '../base/lyricScroll.vue';
    import Audio from './audioPlay.vue';
    import userImg from "@/assets/figure.png";

  export default {
    name: 'Music',
    data(){
      return {
        logo,
        name: "测试名字",
        userImg,
        userMenus: [
          {
            name: "changeMain",
            title: "切换主题",
            pathName: "changeMain",
          },
          {
            name: "changePsword",
            title: "修改密码",
            pathName: "changePsword",
          },
          {
            name: "logout",
            title: "退出",
            pathName: "logout",
            hasDivided: true,
          },
        ],
      }
    },
    components:{
      Lyric,
      Audio
    }
  };
</script>

<style lang="less" scoped>
.index {
    width: 100%;
    min-width: 720px;
    min-height: 100%;
    .head {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        min-width: 1080px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #2e384a;
        box-sizing: border-box;
        padding-left: 20px;
        z-index: 2;
        .organ-logo {
            position: absolute;
            left: 15px;
            height: 54px;
            border-radius: 50%;
        }
        .headLeft {
            font-size: 0.16px;
            color: #fff;
            width: auto;
            padding: 0px 20px;
            box-sizing: border-box;
            margin-left: 40px;
            .foundation {
                height: 58px;
                line-height: 58px;
                text-align: center;
                cursor: pointer;
                font-size: 28px;
                text-shadow: 0 0 0.5em #6eb9d9, -0 -0 0.5em #6eb9d9;
            }
        }
        .headRight {
            height: 58px;
            display: flex;
            align-items: center;
            .logo {
                width: 18px;
                height: 18px;
            }
            .paddingdf {
                height: 100%;
                padding: 0px 16px;
                text-align: center;
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #fff;
            }
            .paddingdf:hover {
                background-color: #242c3a;
                cursor: pointer;
            }
        }
    }
    .main {
        width: 100%;
        box-sizing: border-box;
        /*padding-left: 260px;*/
        /*padding-top: 64px;*/
        height: 100vh;
    }
}
</style>