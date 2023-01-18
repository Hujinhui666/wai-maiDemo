<template>
    <div class="item" @click="toStore">
        <img :src="NavListItems.pic" />
        <div class="item-right">
            <div class="title">{{ NavListItems.title }}</div>
            <div class="sales">{{ NavListItems.sales }}</div>
            <div class="price">{{ NavListItems.price }}</div>
            <div class="label">
                <div v-for="(i, index) in NavListItems.label" :key="index">
                    {{ i }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter} from 'vue-router'
export default {
    props: ['NavListItems'],
    setup(){
        const router=useRouter()
        const toStore=()=>{
            router.push('/store')
        }
        return{
            toStore
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    padding: 10px;
    color: #0d0d0d;

    img {
        width: 120px;
        height: 120px;
        margin-right: 20px;
        border-radius: 10px;
    }

    .item-right {
        display: flex;
        flex-flow: column;

        .title {
            font-size: 18px;
        }

        .label {
            display: flex;

            div {
                border-radius: 5px;
                padding: 2px 5px;
                background-color: #ffc400;
            }
            div:not(:first-child){
                margin-left: 5px;
            }
        }
    }
}

</style>