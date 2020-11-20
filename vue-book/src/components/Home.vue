<template>
    <div>
        <MHeader :back="true">首页</MHeader>
        <div class="content">
          <loading v-if="loading"></loading>
          <template v-else>
            <Swiper class="sw" :swiperSliders="slider"></Swiper>
            <div class="container">
              <h3>热门图书</h3>
              <ul >
                <li v-for="hot in hotBooks">
                  <img :src="hot.bookCover" alt="" @click="showdetail(hot.bookId)">
                  <b>{{hot.bookName}}</b>
                  <div class="hshow" >
                    <h5>{{hot.bookName}}</h5>
                    <p>{{hot.booeInfo}}</p>
                    <p> 单价：{{hot.bookPrice}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </template>
      </div>
    </div>
</template>
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.1/css/bootstrap.min.css"/>

<script>

  import Swiper from '../base/Swiper.vue';
  import MHeader from '@/base/MHeader.vue';
  import {getAll} from '../api';
  import Loading from '../base/Loading.vue';
  import axios from 'axios';

    export default {
      data() {
          return {
            slider:[],
            hotBooks:[],
            loading:true,
            flag:false
          }

      },
       created () {
            this.getData();//获取轮播图 最热图书

      },
      methods: {
        async getData() {
          //给data其别名 对象中的属性名必须和得到的结果名字一致
          //let {data}=await getSliders();
          // 被axios.interceptors.response.use给拦截过滤去掉{}；简化后省去中间变量data


          // this.slider = await getAll();
          let [sliders,hotbooks]= await getAll();
          this.slider=sliders;
          this.hotBooks=hotbooks;
          //已经获取轮播图 最热图书
          this.loading=false;

        },

      },
        computed: {},
        components: {
          MHeader,
          Swiper,
          Loading
        }
    }
</script>

<style scoped lang="less">
  .sw{
      width:100%;
      height: calc(65vw);
      overflow-y: hidden;
  }
.container {
  width: 90%;
  margin: 5% auto;

  h3 {
    color: #2a2a2a;
    margin-bottom: 5px;
  }

  ul {
    display: flex;
    flex-wrap: wrap; /*默认不换行*/
    margin-bottom: 10px;

    justify-content: space-around;
    float:left;
    li {
      width:100%;
      height: calc(130vw);
      padding: 1%;
      img {
        width: 100%;
        height: 70%;
      }

      .hshow {
        display: none;
      }
    }

    @media screen and (min-width: 320px) {
      /*大于等于768*/
      li {
        width: 45%;
        height: calc(65vw);
      }

      /*height: 180px;*/
      /*  img{*/
      /*    width: 90%;*/
      /*    height: 70%;*/
      /*  }*/
      /*  .hshow{*/
      /*    display:none;*/
      /*  }*/
      /*}*/
    }
    @media screen and (min-width: 414px) {
      /*大于等于992*/
      li {
        width: 30%;
        height: calc(45vw);
      }

      /*height: 180px;*/
      /*  img{*/
      /*    width: 90%;*/
      /*    height: 70%;*/
      /*  }*/
      /*  .hshow{*/
      /*    display:none;*/
      /*  }*/
      /*}*/
    }
    @media screen and (min-width: 1024px) {
      /*大于等于1200*/
      li {
        width: 25%;
        height: calc(30vw);
      }

      /*height: 180px;*/
      /*    img{*/
      /*      width: 90%;*/
      /*      height: 70%;*/
      /*    }*/
      /*    .hshow{*/
      /*      display:none;*/
      /*    }*/
      /*  }*/
      /*}*/
    }
  }
}
</style>
