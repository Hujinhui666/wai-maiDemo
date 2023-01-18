<template>
    <div class="cartDetail">
        <div class="content">
            <van-checkbox-group v-model="checked" @change="groundChange">
                <div v-for="(item, index) in store.state.addCartOptions.carList" :key="index">
                    <list-item :item="item" :showCheckBox="true" :handleChange="handleChange" />
                </div>
            </van-checkbox-group>
            <!-- 结算 -->
            <van-submit-bar :price="allPrce" button-text="提交订单" @submit="onSubmit" class="submit-all"
                v-if="store.state.addCartOptions.isDelete">
                <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="choseAll">全选</van-checkbox>
            </van-submit-bar>

            <div class="buy">
                <div class="left">
                    <van-checkbox v-model="submitChecked" checked-color="#ffc400" @click="choseAll">全选</van-checkbox>
                </div>
                <div class="delete" @click="handleDelete">删除</div>
            </div>

        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import ListItem from '../../../components/ListItem.vue'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { showToast } from 'vant';
export default {
    components: { ListItem },
    props:['changeShow'],
    setup(props) {
        const store = useStore()
        const router=useRouter()
        const data = reactive({
            checked: [],
            submitChecked: true
        })

        //增加购物车 数量
        const handleChange = (value, detail) => {
            store.state.addCartOptions.carList.map(item => {
                if (item.id === detail.name) {
                    item.num = value
                }
            })
        }
        // map有返回值 foreach没返回值undefined
        // 初始化
        const init = () => {
            data.checked = store.state.addCartOptions.carList.map(item => {
                return item.id
            })
        }

        // 提交订单
        const onSubmit = () => {
            if (data.checked.length) {
                store.commit('orderOptions/pay',updateData())
                
                router.push({
                    path:'/createOrder',
                    query:{
                        list: data.checked //把选中 的传过去 方便 结算哪个 去掉哪个
                    }
                })
            }else{
                showToast('请选择要付款的商品')
            }
        }
        //全选
        const choseAll = () => {
            if (data.checked.length !== store.state.addCartOptions.carList.length) {
                init()
            } else {
                data.checked = []
            }
        }

        const groundChange = (result) => {
             
            if (result.length === store.state.addCartOptions.carList.length ) {
                data.submitChecked=true
            }else{
                data.submitChecked=false
            }
            data.checked=result
        }

        // 总价格
        const allPrce = computed(() => {
            let countList = updateData()
            let sum = 0;
            countList.forEach(item => {
                sum += item.num * item.price
            });
            return sum * 100;
        })

        // 返回 依据id来选择的 数据
        const updateData = (type) => {
            return store.state.addCartOptions.carList.filter((item) => {
                return type==='delete' ? 
                 !data.checked.includes(item.id): //过滤出来 含 选中id的项
                 data.checked.includes(item.id)
            })
        }

        // 删除商品
        const handleDelete = () => {
            //部分删除
            //全部删除
            if (data.checked.length) {//判断data 的checked是否有值
                store.commit('addCartOptions/delete',updateData('delete'))
                data.checked=[]
                // 没有数据 兜底   子操作父

                if(!store.state.addCartOptions.carList.length){
                    props.changeShow()
                    store.commit('addCartOptions/edit','delete')
                }

            } else {
                showToast('请选择删除商品')
            }
        }

        onMounted(() => {
            init()
        })

        return {
            ...toRefs(data),
            store,
            handleChange,
            onSubmit,
            choseAll,
            groundChange,
            allPrce,
            handleDelete
        }
    }
}
</script>

<style lang="scss" scoped>
.cartDetail {
    font-size: 14px;
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding: 20px 20px 55px;

    .submit-all {
        position: fixed;
        bottom: 52px;
    }

    .buy {
        position: fixed;
        bottom: 48px;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;

        .left {
            display: flex;
            align-items: center;
        }

        .delete {
            color: #fff;
            background-color: #ffc400;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            width: 110px;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }

    .content {
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
    }
}
</style>