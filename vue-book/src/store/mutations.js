import * as Types from 'mutations-types'
const mutations={
  [Types.INCREMENT](state,count){
    state.count+=count;
  },
  [Types.DECREMENT](state){
    state.count--;
  }
};
export default mutations;
