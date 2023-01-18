<template>
  <div class="footer">

    <div class="items">
        <router-link to="/home" class="nav-item" active-class="nav-color">
            <van-icon name="wap-home-o" size="30" />
            首页
        </router-link>
    </div>
   
    <div class="items">
        <router-link to="/cart" class="nav-item" active-class="nav-color">
            <van-icon name="cart-o" size="30" />
            购物车
        </router-link>
    </div>

    <div class="items">
        <router-link to="/order" class="nav-item" active-class="nav-color">
            <van-icon name="label-o" size="30" />
            订单
        </router-link>
    </div>

    <div class="items">
        <router-link to="/mine" class="nav-item" active-class="nav-color">
            <van-icon name="contact" size="30" />
            我的
        </router-link>
    </div>



  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped >
 .footer{
    display: flex;
    background-color: #fff;
    border-top: 0.5px solid #eee;
    font-size: 12px;
    .items{
        .nav-color{
            color: #ffc400;
        }
        flex: 1;
         .nav-item{
            display: flex;
            align-items: center;
            flex-flow: column;
         }
    }
 }
</style>