export default {
  namespaced: true,
  actions: {
   
  },
  mutations: {
    pay (state, value) {
      state.orderList = value
    },
    orderListEnd (state) {
      state.orderListEnd = state.orderListEnd.concat(state.orderList)
    }
  },
  state: {
    orderList: [], // 订单数据
    orderListEnd: [] //连接 订单数组
  },
  getters: {}
}
