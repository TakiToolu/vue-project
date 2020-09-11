<template>
    <div class="detail">
      <MHeader :back="true">详情</MHeader>
      <div>
        <ul >
          <li>
            <label for="bookName">书的名称:</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookId">书的Id:</label>
            <input type="text" v-model="book.bookId" id="bookId">
          </li>
          <li>
            <label for="booeInfo">书的信息:</label>
            <input type="text" v-model="book.booeInfo" id="booeInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格:</label>
            <input type="text" v-model="book.bookPrice" id="bookPrice">
          </li>
          <button @click="update">确认修改</button>
        </ul>

      </div>

    </div>
</template>

<script>
  import MHeader from '../base/MHeader'
  import {findOneBook,updateBook} from '../api'
    export default {
      data() {
          return {
            book:{}
          }
      },
      watch:{
          $route(){//只要路径变化，就重新获取数据
            this.getData();
          },
      },
      created () {
          //页面加载后，根据ID 读文件展示粗来
          this.getData();
      },
      methods: {
        async getData(){//通过bid找到某一项后，赋给book
            this.book=await findOneBook(this.bid);
            //如果是空对象 需要跳转回列表页
            Object.keys(this.book).length>0? void 0:this.$router.push('/list')
          },
        async update(){//点击修改信息
          // console.log(this.book)
          await updateBook(this.bid,this.book);
          this.$router.push('/list');//修改完后跳转,路由

        }
      },
      computed: {
        bid(){
          return this.$route.params.bid;//获取当前路由项的参数
        }
      },
      components: {
        MHeader
      }
    }
</script>
<style scoped lang="less">
.detail{
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
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
