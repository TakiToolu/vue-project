import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import logger from 'vuex/dist/logger';//日志插件
import mutations from './mutations';
//容器是唯一的
const state={count:0};
const getters={ //计算属性
  val:(state)=>state.count%2?'奇数':'偶数'
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins:[logger()],
  strict:true //只能通过mutation（管理员）来更改状态，mutation不支持异步
})
