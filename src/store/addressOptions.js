export default {
  namespaced: true,
  actions: {},
  mutations: {
    addaddress (state, value) {
      state.userAddress.map(i => {
        if (value.isDefault) {
          i.isDefault = false
        }
      })
      state.userAddress.push(value)
    },
    editaddress (state, value) {
      state.userAddress = state.userAddress.map(i => {
        if (value.isDefault) {
          i.isDefault = false
        }
        return i.id === value.id ? value : i
      })
    },
    deleteaddress (state, value) {
      state.userAddress = state.userAddress.filter(item => {
        return !(item.id === value.id)
      })
      if (value.isDefault) {
        state.userAddress[0] = true
      }
    }
  },
  state: {
    userAddress: [
      {
        id: 1001,
        name: 'jason',
        tel: '15874859686',
        province: '广东省',
        city: '深圳市',
        county: '南山区',
        addressDetail: '深圳湾',
        isDefault: true,
        areaCode: '110101'
      },
      {
        id: 1002,
        name: 'allen',
        tel: '15874859685',
        province: '湖北省',
        city: '武汉市',
        county: '武昌区',
        addressDetail: '黄鹤楼',
        isDefault: false,
        areaCode: '110101'
      }
    ]
  },
  getters: {}
}
