<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="toBack" />
    <div>
      {{ title }}
    </div>
    <div class="edit" v-if="edit" @click="handleEdit">
      {{ store.state.addCartOptions.edit ? '编辑' : '完成' }}
    </div>
  </div>
</template>

<script>
import { showToast } from 'vant';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  props: ['title', 'edit'],
  setup() {
    const router = useRouter()
    const store = useStore()
    const toBack = () => {
      router.back()
    }
    const handleEdit = () => {
      if (store.state.addCartOptions.carList.length) {
        store.commit('addCartOptions/edit')
        store.commit('addCartOptions/changeDelete')
      } else {
        showToast("空空如也")
      }
    }

    return {
      toBack,
      store,
      handleEdit
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  color: #0d0d0d;
}

.header {
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;

  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }

  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>