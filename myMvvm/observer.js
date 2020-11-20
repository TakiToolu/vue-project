class Observer{
  constructor (data) {
    this.observer(data);
  }
  observer(data){
    //要对data数据 将原有的属性改成set 和get形式
    if(!data||typeof data !=='object'){
      return ;
    }
    //要将数据一一劫持 先获取到data的key 和 value
    Object.keys(data).forEach(key=>{
      //劫持
      this.defineReactive(data,key,data[key]);
      //深度递归劫持
      this.observer(data[key]);
    })

  }
  //定义响应式
  defineReactive(obj,key,value){
    //在获取某个值得时候 想弹个窗
    let that=this;
    let dep=new Dep();//每个变化的数据都会对应一个数组，用于存放所有更新的操作
    Object.defineProperty(obj,key,{
      enumerable:true,
      configurable:true,
      get () {//当取值时调用
<<<<<<< HEAD
        console.log('Dep.target',Dep.target)
=======
>>>>>>> 2ef4086f8b7251d37207c1ff78cc6dcc5c080933
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set (newValue) {//当给data属性中设置值得时候，更改获取属性的值
        if(newValue!=value){
          console.log(newValue)
          //这里的this不是实例
          that.observer(newValue);
          value=newValue;
          dep.notify();//通知所有人 数据更新了
        }
      }
    })
  }
}
//发布订阅
class Dep{
  constructor () {
    //订阅的数组
    this.subs=[];
  }
  addSub(watcher){
    this.subs.push(watcher);
  }
  notify(){
    this.subs.forEach((watcher)=>{
      return watcher.update()});
  }

}