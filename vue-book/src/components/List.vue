<template>
    <div>
      <MHeader :back="true">列表</MHeader>
      <keep-alive>
        <div class="content"  id="searchBar" @scroll="loadMore" ref="contentbox">
          <ul>
<!--            //在非顶部时下拉，会白屏，li无法显示-->
            <router-link class="router" v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
              <img v-lazy="book.bookCover" alt="">
              <div class="list-r">
                <h4>{{book.bookName}}</h4>
                <p>{{book.booeInfo}}</p>
                <p> 单价：{{book.bookPrice}}</p>
                <div class="btn-list">
                  <button @click.stop="delBook(book.bookId)" class="">删除{{book.bookId}}</button>
                  <button @click.stop="addShops(book.bookId)" class="">添加购物车</button>
                </div>
              </div>
            </router-link>

          </ul>
          <button @click="getData" class="more">加载更多</button>
        </div>
      </keep-alive>
    </div>
</template>

<script>
  import {pagination,removeBook} from '../api'
  import MHeader from '@/base/MHeader.vue'
    export default {
      data() {
          return {
            books:[],
            offset:0,//当前偏移量
            hasMore:true,//是否有更多
            isLoading:false,//if正在加载

          }
      },
      created () {
        this.more();
      },
      mounted () {
        this.pullFresh();

      },
      methods: {
        addShops(id){
          // console.log(this.$store.state)
          let temp=this.$store.state.shops;
          if(temp.indexOf(id)==-1){
            this.$store.state.shops.push(id);
          }

        },
        more(){
          this.getData();
        },
        loadMore(){
          clearTimeout(this.timer);
          //节流,进来时，触发scroll事件 可能触发n次 先进来开一个定时器 下次触发时将上一次的定时器清除掉
          this.timer=setTimeout(()=>{
            //  卷曲的高度    当前课件区域   总高
            let {scrollTop,clientHeight,scrollHeight}=this.$refs.contentbox;
            if(scrollTop+clientHeight+20>=scrollHeight){
              this.getData();
            }
          },50)
        },
        pullFresh(){
          let scroll=this.$refs.contentbox;//获取要拖拽的元素
          let top=scroll.offsetTop;
          let distance=0;
          let isMove=false;//判断是否移动过
          scroll.addEventListener('touchstart',(e)=>{
            //滚动条在最顶端并且盒子在顶端时才触发
            if(scroll.style.top!=0 && scroll.style.offsetTop==top)return;
            let start=e.touches[0].pageY;
            // console.log(start);
            let move=(e)=>{
              isMove=true;
              let current=e.touches[0].pageY;
              distance=current-start;//拉动的距离
              if(distance>0){//向下拉
                if(distance<=100){
                  scroll.style.top=distance+top+'px';
                }else{
                  distance=100;
                  scroll.style.top=top+100+'px';
                }
              }else{
                //不在考虑范围内，移除事件
                scroll.removeEventListener('touchmove',move)
                scroll.removeEventListener('touchend',end)
              }
            };
            let end=(e)=>{
              if(!isMove) return ;//没移动
              isMove=false;
              clearInterval(this.timer1);
              this.timer1=setInterval(()=>{//一共distance 每次-1
                if(distance<=0){
                  clearInterval(this.timer1);
                  distance=0;
                  scroll.style.top=50+'px';
                  scroll.removeEventListener('touchmove',move)
                  scroll.removeEventListener('touchend',end)

                  this.books=[]; //线清空数据
                  this.offset=0;
                  this.getData();
                  return;
                }
                distance-=1;
                scroll.style.top=top+distance+'px';
              },1)
            };
            //不在考虑范围内，移除事件
          scroll.addEventListener('touchmove',move)
          scroll.addEventListener('touchend',end)

          },false)
        },
        async getData(){

          this.isLoading=true;
          if(this.hasMore){//有更多的时候获取数据
            let {hasMore,books}=await pagination(this.offset);
            this.books=[...this.books,...books];//获取的书放到books属性上
            this.hasMore=hasMore;
            this.offset=this.books.length;//维护偏移量 就是书的总长度
          }
          this.isLoading=false;//加载完毕

          // this.books=await getBooks();
        },
        async delBook(id){
          await removeBook(id);
          this.books=this.books.filter(item=>item.bookId!==id);
          //删除后不会引起页面刷新，数据重新加载，所以需要手动将当前页面处理一下，二不是触发刷新，为了减少请求数据
        },

      },
      computed: {},
      components: {MHeader,}
    }
</script>

<style scoped>
  .content {
    /*position: absolute;*/

  }
  .content ul li {
    display:flex;
    padding: 15px;
    margin: 10px;
    text-align: left;
    border:1px solid cadetblue;
  }
  .content ul img{
    width: 25%;
  }
  .list-r{
    width: 100%;
    margin-left:20px;
    text-align:left;
  }
  button{
    background: orangered;
    color: white;
    font-weight: bold;
    width: 80px;
    height: 25px;
    border: none;
    border-radius: 5px;
  }
  .content h4{
    font-size: 20px;
    line-height: 25px;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
  }
  .more{
    position: fixed;
    bottom:50px;
    right: 50px;
    background: #8be5de;
    color: #232222;
    border-radius: 5px;

  }
  .btn-list{
    display:flex;
    width:100%;
    justify-content:space-between;
  /*将该盒子平均分配给子项，并在各自格中居中*/
  }

</style>
