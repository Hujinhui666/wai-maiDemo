<template>
    <Header title="账号管理"></Header>
    <div>
        <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="sign" label="个性签名" placeholder="个性签名" />
        <van-field v-model="pass" label="密码" placeholder="请输入密码" />
    </div>
    <van-button type="primary" color="#ffc400" round block class="save-btn" @click="save">保存</van-button>
    <van-button type="primary" color="#ffc400" round block class="save-btn" @click="logOut">退出登录</van-button>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Header from '../../components/Header.vue';
import { showToast } from 'vant';
import router from '../../router';
import { useRouter } from 'vue-router';
export default {
    components: { Header },
    setup() {
        const router=useRouter()
        const data = reactive({
            name: '',
            sign: '这就是个性签名~~',
            pass: ''
        })

        const save = () => {
            if (data.name && data.pass ) {
                let userInfo=JSON.parse(localStorage.getItem('userInfo'))
                let newUserInfo={
                    user:data.name || userInfo.name,
                    pass:data.pass || userInfo.pass
                };
                localStorage.setItem('userInfo',newUserInfo)
                showToast('修改成功')
                router.push('/mine')
            }else{
                showToast('请输入内容')
            }
         }

        const logOut = () => { 
            localStorage.setItem('isLogin','1')
            showToast('退出成功')
            router.push('/home')
        }

        return {
            ...toRefs(data),
            save,
            logOut
        }

    }

}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

.save-btn {
    width: 80%;
    margin: 20px auto;
}
</style>