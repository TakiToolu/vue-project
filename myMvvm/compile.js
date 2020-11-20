
class Compile {
  constructor (el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
    this.vm = vm;
    if (this.el) {
      //这个元素能获取，才开始编译
      //1 、先把这些真实dom一如到内存中
      let fragment = this.nodetofragment(this.el);
      //2、编译=》 提取想要的元素节点 -model 和文本节点{{}}
      this.compile(fragment);
      //3、 把编译好的 fragment塞回到页面中去
      this.el.appendChild(fragment);
    }
  }


  /*辅助方法*/
  isElementNode (node) {
    return node.nodeType === 1;
  }
  // 是不是指令
  isDirective (name) {
    return name.includes('v-');
  }


  /*核心方法*/
  compileElement (node) {
    //带v-model
    let attrs = node.attributes;//获取当前节点所有属性
    // console.log(attrs)
    Array.from(attrs).forEach(attr => {
      //判断属性名是不是包含v-
      // console.log(attr)
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        //取到对应值放到节点上，这里只实现v-model绑定数据功能，所以只绑定data中的数据
        let expr = attr.value;
        // let type=attrName.splice(2);
        let [, type] = attrName.split('-');
        //node this.vm.$data expr
        //v-model v-text 对应不同名字嗲用不同的编译函数，这个例子里固定
        CompileUtil[type](node, this.vm, expr);
      }
    })
  }

  compileText (node) {
    //{{}}
    // let expr = node.textConent;//取文本中的内容
    let expr = node.nodeValue;//取文本中的内容
    let reg = /\{\{([^}]+)\}\}/g;
    //  [] :任意 ^ :非 +：至少一个
    if (reg.test(expr)) {
      // console.log('text',node);
      CompileUtil['text'](node, this.vm, expr);
    }
  }

  compile (fragment) {
    //需要递归
    let childNodes = fragment.childNodes;
    // console.log(childNodes);
    Array.from(childNodes).forEach(node => {

      if (this.isElementNode(node)) {
        //是元素节点，还需要继续深入的检查
        //这里需要编译元素
        // console.log('element', node);
        this.compileElement(node);
        this.compile(node);
      } else {

        //文本节点
        //这里需要编译文本
        // console.log('text',node);
        this.compileText(node);
      }
    });
  }

  nodetofragment (el) {//需要将el中的内容全部放到内存中
    //文档碎片 内存中的dom节点
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
}
  CompileUtil = {

    getVal (vm, expr) {//通过data名 获取实例上对应的数据
      expr = expr.split('.');//[a,b,s,d,d]
      // console.log(vm.$data)
      return expr.reduce((prev, next) => {
        //vm.$data.a
        // console.log(prev[next])
        return prev[next];
      }, vm.$data);
    },
    getTextVal (vm,expr) {//获取编译文本后的结果,数据data名
      // console.log(arguments)
      return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
        return this.getVal(vm, arguments[1]);
      })
    },
    text (node, vm, expr) {//文本处理编译时期
      let updateFn = this.updater['textUpdater'];
      //{{message}}=> hello.zxx
      let value = this.getTextVal(vm, expr);
<<<<<<< HEAD
      expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
        //如果数据变化了，文本节点需要 重新获取依赖的属性更新文本中的内容
        //arg中的值时正则表达式的分组值，从左至右 由外到内 每个闭括号 为一个分组
        //第一个位置为表达式的值，最后一个为陪陪所有要求的表达式
        console.log(expr)
        console.log(arguments)
=======

      expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
        //如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
        console.log(expr)
>>>>>>> 2ef4086f8b7251d37207c1ff78cc6dcc5c080933
        new Watcher(vm,arguments[1],(newValue)=>{
          //如果数据变化，文本节点需要
          // 重新获取依赖属性更新文本中的内容
          updateFn && updateFn(node,this.getTextVal(vm,expr))//this.getTextVal(vm, expr));
        })
      })
      // console.log(value)
      updateFn && updateFn(node, value);
    },
    setVal(vm,expr,newValue){
      //[message.a]
      expr=expr.split('.');
      //收敛
      return expr.reduce((prev,next,currentIndex)=>{
        if(currentIndex===expr.length-1){
          return prev[next]=newValue;
        }
        return prev[next];
      },vm.$data);
    },
    model (node, vm, expr) {//输入框处理
      let updateFn = this.updater['modelUpdater'];
      new Watcher(vm,expr,(newValue)=>{
        //当值变化后，会调用cb 将新的值传递过来
        updateFn && updateFn(node,this.getVal(vm,expr))//this.getVal(vm,expr));
      });
      node.addEventListener('input',(e)=>{
        let newValue=e.target.value;
        this.setVal(vm,expr,newValue);
      })
      updateFn && updateFn(node, this.getVal(vm, expr));
    },
    updater:{
      //文本更新
      textUpdater (node, value) {
        console.log(node.nodeValue)
        console.log(value)
        // text (node, vm, expr)
        node.nodeValue = value;
      },
      //输入框更新
      modelUpdater (node, value) {
        console.log(node)
        node.value = value;
      }
    }
  }



