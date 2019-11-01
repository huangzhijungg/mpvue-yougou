<template>
  <div class="content">
    <!-- 头部 -->
    <div class="topBar">
      <div class="search">
        <icon type="search"
              size="16"
              color="#bbb" />
        <span>搜索</span>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots
            autoplay
            circular
            duration="1000"
            interval="4000">
      <block v-for="item in swipperData"
             :key="item.goods_id">
        <swiper-item>
          <img :src="item.image_src"
               alt="">
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类格 -->
    <div class="category">
      <div class="categoryItem" v-for="item in catitemsData" :key="item.name">
        <img :src="item.image_src" alt="">
      </div>
    </div>
    <!-- 楼层区 -->
    <ul class="floor">
      <li v-for="(item, index) in floordata" :key="index">
        <img class="img" :src="item.floor_title.image_src" alt="">
        <div class="product_list">
            <img :src="item.product_list[0].image_src" alt="">
          <div class="right">
            <block v-for="(imgItem, imgIndex) in item.product_list" :key="imgItem.name">
              <img :src="imgItem.image_src" v-if="imgIndex" alt="" >
            </block>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 存放轮播图数据
      swipperData: [],
      // 分类图片数据
      catitemsData: [],
      // 楼层区图片数据
      floordata: []
    }
  },
  onLoad () {
    // 获取轮播图数据方法
    this.getSwipperData()
    // 获取分类数据方法
    this.getCatitemsData()
    // 获取楼层区数据方法
    this.getFloordata()
  },
  methods: {
    getSwipperData () {
      this.$request({
        url: '/api/public/v1/home/swiperdata'
      }).then(res => {
        // console.log(res)
        this.swipperData = res
      })
    },
    getCatitemsData () {
      this.$request({
        url: '/api/public/v1/home/catitems'
      }).then(res => {
        this.catitemsData = res
      })
    },
    getFloordata () {
      this.$request({
        url: '/api/public/v1/home/floordata'
      }).then(res => {
        this.floordata = res
      })
    }
  }
}
</script>

<style lang="less">
.topBar {
  width: 100%;
  height: 100rpx;
  background-color: #eb4450;
  padding: 0 16rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .search {
    width: 100%;
    height: 60rpx;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #bbb;
      font-size: 16px;
      margin-left: 16rpx;
    }
  }
}
swiper {
  height: 340rpx;
  img {
    width: 100%;
    height: 100%;
  }
}
.category {
  height: 194rpx;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .categoryItem {
    img {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.fashion {
  width: 100%;
  height: 88rpx;
  img {
    height: 100%;
  }
}
ul {
  li{
    margin-bottom: 20rpx;
  }
}
.img{
  width: 100%;
  height: 88rpx;
}
.product_list {
  width: 100%;
  height: 386rpx;
  padding: 20rpx 17rpx 0 17rpx;
  display: flex;
  img {
    height: 100%;
    width: 232rpx;
  }
  .right {
    flex: 1;

    img {
      width: 232rpx;
      height: 188rpx;
      margin-left: 10rpx;
    }
  }
}
</style>