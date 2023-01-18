<template>
    <div class="create-order">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.state.orderOptions.orderList" :key="index">
                <van-card 
                :num="item.num" 
                :price="item.price"
  
                :title="item.title"
                :thumb="item.pic" />
            </div>
        </div>

        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{totalPrice}}</span>
            </div>
            <van-button type="primary" class="pay-btn" block @click="handleCreateorder">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import { useStore } from 'vuex';
import { showDialog } from 'vant';
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        Header
    },
    setup() {
        const router=useRouter()
        const store = useStore()
        const route=useRoute()

        const data = reactive({
            name: '泥煤滴',
            tel: '13888888888',
            totalPrice:0
        })

        const onEdit = () => {
router.push('/address')
        }   

        const initPrice=()=>{
            let price=0
            if (store.state.orderOptions.orderList.length) {
                store.state.orderOptions.orderList.forEach((item) => {
                    price += item.price * item.num
                });
            }
            data.totalPrice = price
        }

        // 初始化地址
        const initUser=()=>{
            store.state.addressOptions.userAddress.forEach(item=>{
                if(item.isDefault){
                    data.name=item.name
                    data.tel=item.tel
                }
            })
        }

        const handleCreateorder=()=>{
            showDialog({ 
                title:'提示',
                message: '生产订单成功' }).then(()=>{
                    // 要和购物车 联系
                    let newList = store.state.addCartOptions.carList.filter((i)=>{
                        return route.query.list.includes(i.id+"")
                    });
                    store.commit('addCartOptions/delete',newList)
                    store.commit('orderOptions/orderListEnd')
                    router.push('/order')
                }) 
             
        }

        onMounted(()=>{
            initPrice()
            initUser()
        })

        return {
            ...toRefs(data),
            onEdit,
            store,
            handleCreateorder
            
        }

    }
}
</script>

<style scoped lang="less">
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;
    color: #141413;

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .pay-wrap {
        padding: 10px 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #e9e9e9;

        >div {
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;

            span:nth-child(2) {
                color: red;
                font-size: 18px;
            }
        }

        .pay-btn {
            width: 90%;
            margin: 0 auto;
        }
    }
}
</style>