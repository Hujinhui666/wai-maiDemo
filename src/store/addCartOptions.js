export default {
  namespaced: true,
  actions: {},
  mutations: {
    addCart (state, value) {
      state.carList = value
    },
    changeDelete (state) {
      state.isDelete = !state.isDelete
    },
    delete (state, value) {
      state.carList = value
    },
    edit (state, value) {
      if (value) {
        state.edit = true
      } else {
        state.edit = false
      }
    }
  },
  state: {
    carList: [], //购物车的数据
    isDelete: true, // 确定header组件 点击编辑的时候 底部组件展示
    edit: true // 默认显示 编辑
  },
  getters: {}
}
