<template>
    <div class="storeDetails">
        <Header title="店铺"></Header>
        <div class="content">
            <div class="img"></div>
            <div class="foodSort">
                <div class="sort"></div>
                <div class="name">
                    {{ title }}
                    <img :src="img" class="store-img" />
                </div>

                <van-tabs color="#ffc400">
                    <van-tab v-for="(item, index) in storeData" :key="index" :title="item.name">
                        <foods-list :foodsdatas="item.data" :index="index" />
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <!-- 购物车 -->
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.addCartOptions.carList.length" @click="goCart" />
            <van-action-bar-button type="warning" text="加入购物车" @click="handelCart" />
            <van-action-bar-button type="danger" text="立即购买" @click="goBuy" />
        </van-action-bar>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Header from '../../components/Header.vue';
import FoodsList from './components/FoodsList.vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { showToast} from 'vant';
import { onMounted } from '@vue/runtime-core';
import { getApiStoreData} from '../../api/api.js'


export default {
    components: {
        Header,
        FoodsList
    },
    setup() {
        let data = reactive({
            title: '鱼拿酸菜鱼',
            img: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
            storeData: []
        })

        const getStoreData=()=>{
            getApiStoreData().then((res)=>{
                 
                    data.storeData = res
                 
            })

            // axios.get('/home/getStoreData').then((res)=>{
            //     const {code,getsoreData} = res.data
         
            //     if (code === 200) {
            //         data.storeData = getsoreData
            //     }
            // })
        }

        onMounted(()=>{
            getStoreData()
        })

        const store = useStore();
        const router = useRouter()

        // 添加购物车
        const handelCart = (type) => {
            let newList = store.state.addCartOptions.carList || []

            data.storeData.forEach((item) => {
                item.data.items?.forEach((item) => {
                    item.children.forEach((item) => {
                        if (item.num > 0) {
                            newList.push(item)
                        }
                    })
                })
            })
            if (newList.length === 0) {
                showToast("请选择商品")
                return;
            }
            store.commit('addCartOptions/addCart', newList)
            type === 'buy' ? goCart() : ''

        }

        const goCart = () => {
            router.push('/cart')
        }

        const goBuy = () => {
            handelCart('buy')
        }

        return {
            store,
            ...toRefs(data),
            handelCart,
            goCart,
            goBuy

        }
    }
}
</script>

<style lang="scss" scoped>
.storeDetails {
    height: 100%;
    display: flex;
    flex-flow: column;

    .content {
        flex: 1;
        overflow-y: auto;

        .img {
            background: url("../../assets/yuna.jpg") no-repeat center/cover;
            width: 100%;
            height: 150px;
        }

        .foodSort {
            height: 500px;
            background-color: #fff;
            margin-top: -30px;
            border-radius: 20px 20px 0 0;

            .sort {
                margin-top: 10px;
            }

            .name {
                display: flex;
                padding: 20px;
                justify-content: space-between;

                .store-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 10px;
                    margin-top: -30px;
                }
            }
        }
    }
}
</style>