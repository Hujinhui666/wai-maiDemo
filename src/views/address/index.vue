<template>
    <Header title="地址管理" />

    <van-address-list :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />

</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Header from '../../components/Header.vue';
export default {
    components: {
        Header
    },
    setup() {
        const store = useStore()
        const router = useRouter()

        const data = reactive({
            list: []
        })

        //编辑地址
        const onEdit = (item) => {
            router.push({
                path:'/addressEdit',
                query:{
                    id:item.id,
                    type:'edit'
                   
                }
            })
         }

        const onAdd = (item) => { 
            router.push({
                path:'/addressEdit',
                query:{
                    type:'add'
                }
            })
        }

        const init = () => {
            data.list = store.state.addressOptions.userAddress.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
                    isDefault: item.isDefault
                }
            })
        }

        onMounted(() => {
            init()
        })


        return {
            ...toRefs(data),
            store,
            onAdd,
            onEdit
        }

    }
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

/deep/ .van-switch--on {
    background-color: #ffc400;
}

/deep/ .van-radio__icon {
    display: none;
}
</style>