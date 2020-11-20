class MVVM{
  constructor (options) {
    //首先 先把可用的东西挂载在实例上
    this.$el=options.el;
    this.$data=options.data;

    //如果有编译的模板 就开始编译
    if(this.$el){
      //数据劫持 ：把对象的所有属性改成个体、set方法
      new Observer(this.$data);
      //代理，将获取的数据代理给vm
      this.proxyData(this.$data);
      //用数据和元素进行编译
      new Compile(this.$el,this);
    }
  }
  proxyData(data){
    Object.keys(data).forEach(key=>{
      Object.defineProperty( this,key,{
        get(){
          return data[key]
        },
        set (newValue) {
          data[key]=newValue;
        }
      })
    })
  }
}