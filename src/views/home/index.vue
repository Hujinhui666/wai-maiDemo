<template>
  <div class="home">
    <div class="content">
      <!-- 头 -->
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location-o" />
          <span>测试</span>
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="main">
        <div class="main-bg">

          <div class="search">
            <input type="text">
            <div class="search-text">搜索</div>
          </div>

          <div class="sort">

            <div class="big-sort">
              <div v-for="(item, index) in big_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div class="mall-sort">
              <div v-for="(item, index) in small_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>

          <van-tabs class="vanTabs">
            <van-tab v-for="(item, index) in centent_nav_list" :key="index" :title="item.tab">
              <NavList :NavLists="item.data" />
            </van-tab>
          </van-tabs>

        </div>
      </div>

    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import NavList from './components/NavList.vue'
import Footer from '../../components/Footer.vue';
import { onMounted, reactive, ref, toRefs } from 'vue'
import { getApiHomeData } from '../../api/api.js'
export default {
  components: {
    NavList,
    Footer
  },
  setup() {
    const data = reactive({
      big_sort: [],
      small_sort: [],
      centent_nav_list: []
    })

    const homeData = () => {
      getApiHomeData().then((res) => {
        // console.log(res)
        data.big_sort = res.big_sort
        data.small_sort = res.small_sort
        data.centent_nav_list = res.centent_nav_list
      })

      //   axios.get('/home/getHomeData').then((res) => { 
      //     const {code,HomeData}=res.data
      //     if (code === 200) {
      //       data.big_sort = HomeData.big_sort
      //       data.small_sort = HomeData.small_sort
      //       data.centent_nav_list = HomeData.centent_nav_list
      //     }
      //   })

    }

    onMounted(() => {
      homeData()
    })

    const active = ref(0)

    return {
      ...toRefs(data, active)
    }
  }

}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-flow: column;
  font-size: 12px;

  .content {
    flex: 1;
    overflow-y: auto;

    .header {
      background-image: linear-gradient(#ffc400, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;

      .text {
        font-size: 20px;
        font-weight: 600;
      }

      .location {
        span {
          margin: 0 5px;
        }

        font-size: 14px;
      }
    }
  }


  .main {
    margin-top: -30px;

    .main-bg {
      background-image: linear-gradient(#fff, #f5f5f5);
      padding: 10px 20px 0px 20px;
      border-radius: 30px 30px 0 0;

      .search {

        position: relative;

        input {
          background-image: linear-gradient(#fff, #f5f5f5);
          width: 100%;
          border: 1px solid #ffc400;
          border-radius: 20px;
          height: 30px;
          color: rgb(15, 14, 14);
        }

        .search-text {
          position: absolute;
          right: -16px;
          top: 1px;
          background-color: #ffc400;
          border-radius: 16px;
          width: 50px;
          height: 37.5px;
          font-size: 14px;
          line-height: 37.5px;
          text-align: center;
        }
      }

      .sort {
        margin-top: 5px;
        color: #0d0d0d;

        .big-sort {
          display: flex;

          div {
            flex: 1;
            display: flex;
            flex-flow: column;
            align-items: center;

            .icon {
              width: 50px;
              height: 50px;
            }
          }
        }

        .mall-sort {
          display: flex;
          margin-top: 15px;
          flex-wrap: wrap;

          div {
            display: flex;
            flex-flow: column;
            align-items: center;
            width: 20%;

            .icon {
              height: 30px;
              width: 30px;
            }
          }
        }
      }

      .vanTabs {
        margin-top: 10px;
      }
    }
  }
}

// 样式穿透
.vanTabs ::v-deep .van-tabs__wrap {
  border-radius: 10px;
}
</style>