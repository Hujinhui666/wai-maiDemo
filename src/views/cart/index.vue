<template>
  <div class="cart">
    <Header title="购物车" :edit="true" />
    <CartDetial v-if="isShow" :changeShow="changeShow"/>
    <Empty v-else/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue';
import Empty from '../../components/Empty.vue';
import Header from '../../components/Header.vue';
import CartDetial from './components/CartDetail.vue'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    Footer,
    Empty,
    Header,
    CartDetial
  },
  setup() {

    const isShow = ref(true)
    const store = useStore()

    // 初始化
    const init = () => {
      if (store.state.addCartOptions.carList.length === 0) {
        isShow.value = false
      }
    }

    const changeShow=()=>{
      isShow.value = false
    }

    onMounted(()=>{
      init()
    })

    return{
      isShow,
      changeShow
    }

     
    
    

  }


}
</script>

<style lang="scss" scoped>
.cart {
  height: 100%;
  display: flex;
  flex-flow: column;
  color: #141413;


  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>