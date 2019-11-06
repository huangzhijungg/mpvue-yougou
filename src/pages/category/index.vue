<template>
  <div>
    <div>
      <!-- 头部 -->
      <TopBar />
      <!-- 下面分类区 -->
      <div class="main">
        <!-- 左边 -->
        <ul class="left">
          <li v-for="(item, index) in categoryList"
              :key="item.cat_id"
              @click="activeIndex=index"
              :class="{active:activeIndex===index}">{{item.cat_name}}</li>
        </ul>
        <!-- 右边 -->
        <div class="right"
             v-if="isInit">
          <img src="../../../static/icon/titleImage.png"
               alt="">
          <div class="cate2"
               v-for="(item1, index1) in categoryList[activeIndex].children"
               :key="item1.cat_id">
            <div class="title">
              <p>/ <span>{{item1.cat_name}}</span> /</p>
            </div>
            <ul class="cate3">
              <li v-for="(item2, index2) in item1.children"
                  :key="item2.cat_id"
                  @click="toList(item2.cat_name)">
                <img :src="item2.cat_icon"
                     alt="">
                <p>{{item2.cat_name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  components: {
    TopBar
  },
  data () {
    return {
      // 当前激活的元素下标
      activeIndex: 0,
      // 获取的分类数据
      categoryList: [],
      isInit: false
    }
  },
  created () {
    // 获取分类总数据
    this.getCategory()
  },
  // // 小程序生命周期钩子
  // onLoad () {
  //   // 获取分类总数据
  //   this.getCategory()
  // },
  methods: {
    getCategory () {
      this.$request({
        url: '/api/public/v1/categories'
      }).then(data => {
        // console.log(data)
        this.categoryList = data
        this.isInit = true
      })
    },
    // 点击获取对应的关键字去到列表页面
    toList (name) {
      wx.navigateTo({ url: '/pages/list/main?keyword=' + name })
    }
  }
}
</script>

<style lang="less">
@red: #eb4450;
.main {
  // margin-top: 20rpx;
  display: flex;
  position: absolute;
  top: 100rpx;
  right: 0;
  bottom: 0;
  left: 0;
  .left {
    width: 198rpx;
    background-color: #f4f4f4;
    overflow: auto;
    li {
      height: 100rpx;
      border-bottom: 1px solid #eee;
      text-align: center;
      line-height: 100rpx;
      color: #333;
      font-size: 14px;
    }
    .active {
      color: @red;
      background-color: #fff;
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 22rpx;
        content: "";
        width: 8rpx;
        height: 60rpx;
        background-color: @red;
      }
    }
  }
}
.right {
  flex: 1;
  width: 520rpx;
  overflow: auto;
  margin: 20rpx 16rpx 0 16rpx;
  img {
    width: 100%;
    height: 180rpx;
  }
}
.cate2 {
  // display: flex;
  .title {
    height: 110rpx;
    width: 100%;
    p {
      text-align: center;
      line-height: 110rpx;
      color: #e0e0e0;
      // font-size: 14px;
      span {
        color: #333;
        margin: 0 30rpx;
      }
    }
  }
}
.cate3 {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: center;
  li {
    width: 33.33%;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120rpx;
      height: 120rpx;
    }
    p {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>