import Mock from 'mockjs'
import homeApi from './MockData/homeApi'
import storeApi from './MockData/storeApi'

Mock.mock('/home/getHomeData', homeApi.getHomeData)
Mock.mock('/home/getStoreData', storeApi.getStoreData)
