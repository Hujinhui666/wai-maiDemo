<template>
    <Header :title="address" />
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
        :address-info="addressInfo" />
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Header from '../../components/Header.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { showToast } from 'vant';

export default {
    components: {
        Header
    },
    setup() {
        const route=useRoute()
        const router=useRouter()
        const store=useStore()
        const data = reactive({
            areaList: {
                province_list: {
                    110000: "广东省",
                    120000: "浙江省",
                },
                city_list: {
                    110100: "广州市",
                    110200: "深圳市",
                    120100: "杭州市",
                    120200: "宁波市",
                },
                county_list: {
                    110101: "天河区",
                    110102: "海珠区",
                    120102: "上城区",
                    130102: "下城区",
                }
            },
            addressInfo:{},
            

        })

        // 保存地址
        const onSave = (AddressEditInfo) => { 
            if (route.query.type === 'add') {
                store.commit('addressOptions/addaddress',AddressEditInfo)
                showToast('添加成功')
            }else{
                store.commit('addressOptions/editaddress',AddressEditInfo)
                showToast('编辑成功')
            }
            setTimeout(()=>{
                router.back()
            },1000)
        }

        const onDelete = (AddressEditInfo) => { 
            store.commit('addressOptions/deleteaddress',AddressEditInfo)
            showToast('删除成功')
            setTimeout(()=>{
                router.back()
            },1000)
        }

        const init=()=>{
            store.state.addressOptions.userAddress.forEach((i) => {
                if (i.id === Number(route.query.id) ) {
                    data.addressInfo = i
                }
            });
        }

       const address=computed(()=>{
        return route.query.type === 'add' ? '地址新增' : '地址编辑'
       })

        onMounted(()=>{
            init()
        })

        return {
            ...toRefs(data),
            onSave,
            onDelete,
            address
        }
    }
}
</script>

<style lang="less" scoped>
xxxxxxxxxx /deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

/deep/ .van-switch--on {
    background-color: #ffc400;
}
</style>