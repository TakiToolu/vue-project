//观察者 目的是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法
class Watcher{
  constructor (vm,expr,cb) {
    this.vm=vm;
    this.expr=expr;
    this.cb=cb;
    //先获取以下老值
    this.value=this.get();
  }
  getVal (vm, expr) {//通过data名 获取实例上对应的数据
    expr = expr.split('.');//[a,b,s,d,d]
    // console.log( vm.$data)
    return expr.reduce((prev, next) => {
      //vm.$data.a
      // console.log(prev[next])
      return prev[next];
    }, vm.$data);
  }
  get(){
    Dep.target=this;
    console.log(Dep.target)

    let value=this.getVal(this.vm,this.expr);
    Dep.target=null;
    return value;
  }

  //对外暴露的方法
  update(){
    let newValue=this.getVal(this.vm,this.expr);
    let oldValue=this.value;

    if(newValue!=oldValue){
      console.log(this.value)
      this.cb(newValue);//对应watch的callback
    }
    return 1;
  }
}
//用新值和老值进行比对 如果发生变化 就调用更新方法
// vm.$watch(vm,'a',function (params) {
//
// })