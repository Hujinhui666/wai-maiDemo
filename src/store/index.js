import { createStore } from 'vuex'
import Vuex from 'vuex'
import addCartOptions from './addCartOptions'
import addressOptions from './addressOptions'
import orderOptions from './orderOptions'


// export default createStore({
//   state: {
//     carList: [], //购物车的数据
//     isDelete: true, // 确定header组件 点击编辑的时候 底部组件展示
//     edit: true, // 默认显示 编辑

//     orderList: [], // 订单数据
//     userAddress: [
//       {
//         id: 1001,
//         name: 'jason',
//         tel: '15874859686',
//         province: '广东省',
//         city: '深圳市',
//         county: '南山区',
//         addressDetail: '深圳湾',
//         isDefault: true,
//         areaCode: '110101'
//       },
//       {
//         id: 1002,
//         name: 'allen',
//         tel: '15874859685',
//         province: '湖北省',
//         city: '武汉市',
//         county: '武昌区',
//         addressDetail: '黄鹤楼',
//         isDefault: false,
//         areaCode: '110101'
//       }
//     ],
//     orderListEnd: [] //连接 订单数组
//   },
//   mutations: {
//     addCart (state, value) {
//       state.carList = value
//     },
//     changeDelete (state) {
//       state.isDelete = !state.isDelete
//     },
//     delete (state, value) {
//       state.carList = value
//     },
//     edit (state, value) {
//       if (value) {
//         state.edit = true
//       } else {
//         state.edit = false
//       }
//     },

//     pay (state, value) {
//       state.orderList = value
//     },
//     orderListEnd (state) {
//       state.orderListEnd = state.orderListEnd.concat(state.orderList)
//     },

//     addaddress (state, value) {
//       state.userAddress.map(i => {
//         if (value.isDefault) {
//           i.isDefault = false
//         }
//       })
//       state.userAddress.push(value)
//     },
//     editaddress (state, value) {
//       state.userAddress = state.userAddress.map(i => {
//         if (value.isDefault) {
//           i.isDefault = false
//         }
//         return i.id === value.id ? value : i
//       })
//     },
//     deleteaddress (state, value) {
//       state.userAddress = state.userAddress.filter(item => {
//         return !(item.id === value.id)
//       })
//       if (value.isDefault) {
//         state.userAddress[0] = true
//       }
//     }
//   },
//   actions: {
     
//   },
//   getters: {}
// })

export default new Vuex.Store({
  modules:{
    addCartOptions,
    addressOptions,
    orderOptions
  }
})