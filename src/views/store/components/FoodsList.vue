<template>
    <div class="food-list" v-if="index === 0">
        <van-tree-select @click-nav="navClick" v-model:main-active-index="activeIndex" height="85vw" :items="items">

            <template #content>
                <div v-for="(i, index) in subItem" :key="index" class="item-bg">
                    <ListItem :item='i' :handleAdd="handleAdd" :handleChange="handleChange"
                    :showCheckBox="false" />
                </div>
            </template>
        </van-tree-select>
    </div>


    <div v-else class="elseDive">
        {{ foodsdatas.content }}
    </div>

</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import FoodListitems from './FoodListitems.vue'
// 抽离item
import ListItem from '../../../components/ListItem.vue'
export default {
    components: { FoodListitems, ListItem },
    props: ['foodsdatas', 'index'],
    setup(props) {
        let data = reactive({
            activeIndex: 0,
            items: [],
            subItem: []  //代表 children
        })

        // 初始化数据
        const initData = () => {
            let newArray = []
            props.foodsdatas?.items?.forEach((item, index) => {
                newArray.push({
                    text: item.text
                })
                if (data.activeIndex === index) {
                    data.subItem = item.children
                }


            });
            data.items = newArray

        }
        initData();
        // trees 点击的索引
        const navClick = (i) => {
            data.activeIndex = i
            initData();
        }

        const handleAdd = (id) => {
            data.subItem.forEach((item, index) => {
                if (item.id === id) {
                    item.add = false
                    item.num += 1
                }
            })

        }

        // 步进值
        const handleChange = (value, detail) => {
            data.subItem.forEach(item => {
                if (item.id === detail.name) {
                    item.num = value
                }
            })

        }


        return {
            ...toRefs(data),
            navClick,
            handleAdd,
            handleChange
        }

    }
}
</script>

<style lang="less" scoped>
.food-list {
    margin-top: 20px;
    color: #141413;
    .item-bg {
        padding: 10px;
    }
}

.elseDive{
    color: #141413;
}

/deep/ .van-tree-select__item--active {
    color: #ffc400;
}

/deep/ .van-sidebar-item--select::before {
    background-color: #ffc400;
}
</style>