<template>
  <div class="order">
    <Header title="订单" />
    <div class="content">
      <van-tabs>
        <van-tab :title="i" v-for="(i,index) in navData" :key="index">
          <div v-for="(item, index) in store.state.orderOptions.orderListEnd" :key="index">

            <div v-if="i === '全部' && store.state.orderOptions.orderListEnd.length">
              <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>

            <div v-else>
              <Empty />
            </div>
          </div>



        </van-tab>
      </van-tabs>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Footer from '../../components/Footer.vue';
import Header from '../../components/Header.vue'
import { useStore } from 'vuex';
import Empty from '../../components/Empty.vue';
export default {
  components: {
    Footer,
    Header,
    Empty
  },
  setup() {
    const store = useStore()
    const data = reactive({
      navData: ['全部', '交易完成', '待付款', '已发货']
    })


    return {
      ...toRefs(data),
      store
    }
  }

}
</script>

<style lang="scss" scoped>
.order {
  color: #141413;
  height: 100%;
  display: flex;
  flex-flow: column;

  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>