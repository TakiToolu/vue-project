let notify={ //需要在此对象中拥有一个install方法

}
notify.install=function(Vue,options={delay:3000}){
  Vue.prototype.$notify=function(){
    options={...options,...opt};//用自己调用插件时传递过来的属性 覆盖掉默认设置好的
    let V=Vue.extend(model);//返回的是一个构造函数的子类，参数是包含组件选项的对象
    let vm=new V;
    let oDiv=document.createElement('div');//创建一个div将实例挂载到元素上
    vm.$mount(oDiv);
    document.body.appendChild(oDiv);
    setTimeout(()=>{
      //延迟多少秒 将dom元素移除掉
      document.body.removeChild(vm.$el);
    },options.delay);
  }
}
//导出这个包含install的对象，如果使用Vue.use就睡调用这个install方法
export default notify;