let http=require('http');
let fs=require('fs');
// let JSON=require('JSON');
let url=require('url');
//获取轮播图 、slider
let slider=require('./slider.js');

function read(cb){
  fs.readFile('./book.json','utf-8',function (err,data) {
    if(err||data.length == 0){
        cb([]);
    } else{
      cb(JSON.parse(data));//将读出来的额内容转换成对象
    }
  });
}
function write(data ,cb){ //写入文件
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}


http.createServer((request,res)=>{
  // this.use(function (req,res,next) {
    //以下配置 为了开发时跨域 上线中的代码需删除
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    //接收ajax请求手动提交的cookie信息
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("X-Powered-By", ' 3.2.1');

    if(request.method=="OPTIONS") return res.end();//让options请求快速返回
    // else next();
  // })

    let {pathname,query}=url.parse(request.url,true);//true 把query转换成对象
    let pageSize=5;//每页写5个
    if(pathname==='/slider'){

        res.setHeader('Content-Type','application/json;charset=utf-8');
      // console.log(JSON.stringify(slider))
        return res.end(JSON.stringify(slider));
    }

    if(pathname==='/hot'){
        read(function (books) {
              let hot=books.reverse().slice(0,6);
              res.setHeader('Content-Type','application/json;charset=utf-8');
              res.end(JSON.stringify(hot));
        });
        return;
    }

    if(pathname==='/page'){
        let offset=parseInt(query.offset)||0;//拿到当前前端传递的值
        read(function(books){
          let result=books.slice(offset,offset+pageSize);//数据倒叙
          let hasMore=true;//默认有更多
          if(books.length<=offset+pageSize){//已显示的数目大于了总条数
            hasMore=false;
          }
          res.end(JSON.stringify({hasMore,books:result}));
        });
        return ;
    }
    if(pathname==='/collect'){
      let shopBooks=[];
      request.on('data',chunk=>{ //监听
        if(chunk){
          shopBooks=chunk.toString()//.split(" ");
        }
        console.log(shopBooks)
        read(function(data){
          let books=data.filter(function(ele){
            // console.log(ele)
            // console.log(shopBooks.indexOf(ele.bookId))
            return shopBooks.indexOf(ele.bookId)>-1? true:false;
          })
          // console.log(books)
          // res.end()
          res.end(JSON.stringify({shopBooks:books}))
        })

      });
      // res.end();
      return ;
    }
    if(pathname==='/books'){ //增删改查，？id=1
        let id=query.id;//取出的字符串
        switch(request.method){
          case 'GET'://查询
            if(typeof id!='undefined'){//查询一个
              read(function (books) {

                let book=books.find(item=>item.bookId==id);
                // console.log(book);
                if(!book){book={};}//若没找到是undefined
                res.setHeader('Content-Type','application/json;charset=utf-8');
               return  res.end(JSON.stringify(book));
              });
            }else{//获取所有图书
                read(function (books) {
                  res.setHeader('Content-Type','application/json;charset=utf-8');
                  res.end(JSON.stringify(books.reverse()));
                })
            }
            break;

          case 'POST'://新增
            let str='';
            request.on('data',chunk=>{ //监听
              str+=chunk;
            });
            request.on('end',()=> {
              let book = JSON.parse(str);//book要改成什么样子；
              read(function (books) {
                book.bookId=books.length?Number(books[books.length-1].bookId)+1:1;
                books.push(book);
                write(books,function () {
                  res.end(JSON.stringify(book));
                })

              })
            });
            break;

           case 'PUT'://s修改
             if(id){//获取当前要修改的ID
               let str='';
               request.on('data',chunk=>{
                 str+=chunk;
               });
               request.on('end',()=>{
                 let book=JSON.parse(str);//book要改成什么样子；
                 read(function (books) {
                   books=books.map(item=>{
                     if(item.bookId==id){//zhaodaoid相同的书
                       return book;
                     }
                     return item;//其他书正常返回即可
                      });
                   write(books,function () {//数据写回JSON
                   res.end(JSON.stringify(book));
                   })
                 })
               })
             }
            break;

          case 'DELETE':
            read(function (books) {
              res.setHeader('Content-Type','application/json;charset=utf-8');
              books=books.filter(item=>item.bookId!=id);
              //删除的是实例中的data，源文件中没有修改，所以每次会再加载，值能删除一个，所以需要协会数据
              write(books,function () {
                //删除返回空对象
                res.end(JSON.stringify({}));
              })
            })
            break;
        }
        return;
    }

    //读取一个路劲
  fs.stat('.'+pathname,function(err,stats){
    if(err){
      res.statusCode=404;
      res.end('NOT FOUND');
      //找不到跳转到首页
      fs.createReadStream('index.html')
        .pipe(res);
    }else{
      if(stats.isDirectory()){
        let p=require('path').join('.'+pathname,'./index.html');
        fs.createReadStream(p).pipe(res);
      }else{
        fs.createReadStream('.'+pathname).pipe(res);
      }

    }
  })
}).listen(3000);//监听3000 接口
