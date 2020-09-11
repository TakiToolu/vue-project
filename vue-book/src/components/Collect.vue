<template>
    <div>
      <MHeader :back="true">购物车</MHeader>
      <div class="content">
        <ul>
          <router-link class="router" v-for="(book,index) in shopBooks" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
            <img v-lazy="book.bookCover" alt="">
            <div class="list-r">
              <h4>{{book.bookName}}</h4>
              <p>{{book.booeInfo}}</p>
              <p> 单价：{{book.bookPrice}}</p>
              <div class="btn-list">
                <button @click.stop="delBook(book.bookId)" class="">删除{{book.bookId}}</button>

              </div>
            </div>
          </router-link>
        </ul>
      </div>

    </div>
</template>

<script>
  import MHeader from '@/base/MHeader.vue';
  import {getShopBooks} from '../api'

    export default {
      data(){
        return {
          shopId:[],
          shopBooks:[],
        }
      },
      mounted () {
        // console.log(eventBus)
        this.getData()
      },
      methods: {
        async getData(){
          this.shopId=this.$store.state.shops;
          // console.log(getShopBooks(this.shopId))
          // console.log(getShopBooks(this.shopId).data)
          let {shopBooks}=await getShopBooks(this.shopId);
          this.shopBooks=shopBooks;
          // console.log(this.shopBooks)
        },
        delBook(id){
          let temp=this.$store.state.shops.filter( (shopId)=>shopId!=id);
          this.$store.state.shops=temp;
          this.shopBooks=this.shopBooks.filter((book)=>book.bookId!=id);
        }
      },
      watch:{

      },
        computed: {},
        components: {MHeader,}
    }
</script>

<style scoped>
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
</style>
