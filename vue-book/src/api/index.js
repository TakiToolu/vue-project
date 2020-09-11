import axios from 'axios';
import Vue from 'vue';
axios.defaults.baseURL='http://localhost:3000';
//增加默认的请求的路径，只有开发时会用，上线后删掉

//拦截器 过滤
axios.interceptors.response.use((res)=>{
  return res.data;//在这里统一拦截结果，将结果处理成res.data，去掉接收数据时用的{}
})

//获取轮播图数据,返回一个promise对象
export let getSliders=()=>{
  return  axios.get('/slider');//获取资源
};
export  let getHotBooks=()=>{
  return axios.get('/hot');
}
//获取全部图书
export  let getBooks=()=>{
  return axios.get('/books');
}
//删除某一本图书
export  let removeBook=(id)=>{
  console.log(id);
  return axios.delete('/books?id='+id);
}
//获取某一本书
export let findOneBook=(id)=>{
  return axios.get('/books?id='+id);
}
//修改图书
/*
* @param id 编号
* @param data 数据 请求提发送
* @return {Axiospromise<T>}
* */
export  let updateBook=(id,data)=>{
  // console.log(data)
  return axios.put('/books?id='+id,data);//	传输文件
}
export let addBook=(data)=>{
  // console.log(data);
  return axios.post('/books',data);//传输实体主体
}
export  let getAll=()=>{
  return axios.all([getSliders(),getHotBooks()])//辅助同时发送多个请求
}
//根据偏移量 返回对应的数据
export let pagination=(offset)=>{
  return axios.get('/page?offset='+offset);
}
export let getShopBooks=(data)=>{ //data:shopIds
  // console.log(data)
  return axios.post('/collect',data);
}
