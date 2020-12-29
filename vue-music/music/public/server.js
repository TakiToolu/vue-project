const express=require('express');
const fs=require('fs')
const PORT=4000
const HOST='localhost'
const app=express();


function read(cb){
  fs.readFile('./hock/songList','utf-8',function(err,data){
    if(err||data.length==0){
      cb([]);
    }else{
      cb(JSON.parse(data));
    }
  })
}
function write(data,cb){
  fs.writeFile('./hock/songList.json',JSON.stringify(data),cb);
}

app.get('/home',(res,req)=>{

})
app.listen(PORT,HOST,()=>{
  console.log(`运行在：http://${HOST}:${PORT}`);
})