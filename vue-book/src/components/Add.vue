<template>
  <div class="detail">
    <MHeader :back="true">添加</MHeader>
    <div>
      <ul >
        <li>
          <label for="bookName">书的名称:</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="booeInfo">书的信息:</label>
          <input type="text" v-model="book.booeInfo" id="booeInfo">
        </li>
        <li>
          <label for="bookPrice">书的封面:</label>
          <input type="text" v-model="book.bookCover" id="bookCover">
        </li>
        <li>
          <label for="bookPrice">书的价格:</label>
          <input type="text" v-model="book.bookPrice" id="bookPrice">
        </li>
        <button @click="submit">添加</button>
      </ul>

    </div>

  </div>

</template>

<script>
  import MHeader from '../base/MHeader'
  import {addBook} from '../api'
    export default {
        data() {
            return {book:{}}
        },
        methods: {
          async submit(){
            // console.log(this.book)
            await  addBook(this.book);
            this.$router.push('/list');
          },
        },
        computed: {},
        components: {MHeader,}
    }
</script>

<style scoped lang="less">
  .detail{
    position: absolute;
    top:0;
    left: 0;
    bottom: 50px;
    right: 0;
    background: #fff;
    z-index:100;
  }
  ul{
    margin-top: 15%;
    margin-right: 10px;
    li{
      label{

        display:block;
        float: left;
        margin-left: 10%;
        font-size: 22px;
      }
      input{
        margin:10px;
        height: 20px;
        width: 80%;
        border-color:darkgrey;
        font-size: small;

      }
    }
    button{
      display:block;
      background-color: cadetblue;
      color: white;
      font-weight: bold;
      width: 22%;
      height: 25px;
      border: none;
      border-radius: 4px;
      margin:5% 10%;

    }
  }
</style>
