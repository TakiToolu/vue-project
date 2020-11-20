<template>
    <div class="swiper-container">
      <swiper  ref="mySwiper" class="swiper-wrapper" :options="swiperOptions">
        <swiper-slide class="lunbow " v-for="(slide,key) in swiperSliders" :key="key">
          <img class="lunbo" :src="slide" alt="">
        </swiper-slide>
        <div class="swiper-pagination " slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev" ></div>
        <div class="swiper-button-next" slot="button-next" ></div>
      </swiper>
    </div>
</template>
<!--<link rel="stylesheet" href="path/to/swiper.css"/>-->
<script>
  import 'swiper/swiper-bundle.css'
    export default {
      name:'carousel',
      props:['swiperSliders'],
      data() {
        return {
          swiperOptions: {
            pagination: {
                el: '.swiper-pagination'
                },
                // Some Swiper option/callback...
                autoplay:3500,
                setWrapperSize:true,
                paginationClickable:true,
                mousewhelControl:true,
                observerParents:true,
          },
        }
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.$swiper
        }
      },
      methods:{
        add(){

        },
        sub(){

        }
      },
      mounted() {
        // console.log('Current Swiper instance object', this.swiper)
        this.swiper.slideTo(3, 1000, false)
      },
    }
</script>
<style scoped>
.lunbo{
  width: 100%;
  /*height: 30%;*/
  /*overflow-y: hidden;*/
}

.swiper-pagination {
    cursor: pointer;
    bottom:0px;
    height: 25px;
    width:100%;
    text-align: center;
    transition: 300ms opacity;
    transform: translate3d(0, 0, 0);
    background-color: rgba(217, 232, 206, 0.75);
    z-index:100;
}
/*.swiper-pagination {*/
/*  position: absolute;*/
/*  cursor: pointer;*/
/*  bottom:0px;*/
/*  height: 25px;*/
/*  width:100%;*/
/*  background-color: rgba(217, 232, 206, 0.75);*/
/*  text-align: center;*/
/*  transition: 300ms opacity;*/
/*  transform: translate3d(0, 0, 0);*/
/*  z-index: 100;*/
/*}*/
/*.swiper-pagination-clickable .swiper-pagination-bullet {*/
/*}*/

</style>
