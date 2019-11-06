<template>
  <div>
    <div class="top"
         :style="{position:!isScroll?'static':'fixed'}">
      <!-- 头部搜索框 -->
      <!-- <div class="headerTop">
        <icon type="search"
              size="14"
              color="#bbb" />
        <input type="text"
               value="小米"
               v-model="keyword"
               confirm-type="go"
               @confirm="reload">
      </div> -->

      <Search @confirm="inputHeadler" :query="keyword"/>
      <!-- 排序按钮 -->
      <ul class="filter">
        <li v-for="(item, index) in filterList"
            :key="index"
            @click="activeIndex=index"
            :class="{active:activeIndex===index}">{{item}}</li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <ul class="goods-list"
        :style="{marginTop:isScroll?'220rpx':'0'}">
      <li v-for="(item, index) in goodsList"
          :key="index"
          @click="toItem(item.goods_id)">
        <img :src="item.goods_big_logo"
             alt="">
        <div class="right">
          <p class="goods-title">{{item.goods_name}}</p>
          <p class="goods-price">￥ <span>{{item.goods_price}}</span>.00 </p>
        </div>
      </li>
    </ul>
    <!-- 到最后一页没有数据了给得提示 -->
    <p class="bottom"
       v-show="isLastPage">后面没有了哦!</p>
  </div>
</template>

<script>
import Search from '@/components/search'
// 定义页容量为常量
const PAGE_SIZE = 30
export default {
  // 注册的组件
  components: {
    Search
  },
  data () {
    return {
      filterList: [
        '综合',
        '销量',
        '价格'
      ],
      // 当前激活的元素下标
      activeIndex: 0,
      // 关键字
      keyword: '',
      // 列表数据
      goodsList: [],
      // 是否为最后一页
      isLastPage: false,
      // 监听是否在滚动
      isScroll: false
    }
  },
  // 小程序生命周期钩子
  onLoad (options) {
    // console.log(options.keyword)
    // 定义关键字,将分类页传过来的给他赋值
    this.keyword = options.keyword
    // // 重新加载置为false
    // this.isLastPage = false
    // // 清空原来数据
    // this.goodsList = []
    // // 定义页码为1
    // this.pageNum = 1
    // 是否在请求中
    this.isRequest = false
    // // 获取数据方法
    // this.getGoodsList()
    // 调用回车事件
    this.reload()
  },
  // 下拉刷新执行函数
  onPullDownRefresh () {
    // 下拉时改为false
    this.isScroll = false
    this.reload()
  },
  // 上拉执行函数,触底50加载下一页
  onReachBottom () {
    // 页码加一页
    this.pageNum++
    // 重新发送请求
    this.getGoodsList()
  },
  // 页面滚动执行函数,监听页面是否滚动
  onPageScroll () {
    // 监听页面是否滚动,改为false
    this.isScroll = true
    // console.log(this.isScroll)
  },
  methods: {
    getGoodsList () {
      // 判断是否正在发请求或是不是最后一页,如果是就不会再发请求直接retrun
      if (this.isRequest || this.isLastPage) {
        return
      }
      this.isRequest = true
      this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keyword,
          // 页容量定义为常量
          pagesize: PAGE_SIZE,
          pagenum: this.pageNum
        }
      }).then(data => {
        console.log(data)
        this.goodsList = [...this.goodsList, ...data.goods]
        // 判断数据列表的长度等不等于data中的总数据长度
        if (this.goodsList.length === data.total) {
          this.isLastPage = true
        }
      }).finally(() => {
        // 设置为没有在请求中
        this.isRequest = false
      })
    },
    inputHeadler (data) {
      this.keyword = data
      this.reload()
    },
    // 输入框按下回车调用此方法
    reload () {
      // 特码重置为1
      this.pageNum = 1
      // 将原来的数据清空
      this.goodsList = []
      // 将是否为最后一页设为false
      this.isLastPage = false
      // 调用方法发请求
      this.getGoodsList()
    },
    // 点击每一个元素跳转到详情页面
    toItem (goodsId) {
      wx.navigateTo({ url: '/pages/item/main?goodsId=' + goodsId })
    }
  }
}
</script>

<style lang="less">
@red: #eb4450;
.top {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
}
.headerTop {
  height: 120rpx;
  // width: 100%;
  background-color: #eee;
  padding: 30rpx 16rpx;
  position: relative;
  box-sizing: border-box;
  input {
    height: 60rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 6rpx;
    padding-left: 80rpx;
    box-sizing: border-box;
    font-size: 28rpx;
  }
  icon {
    position: absolute;
    top: 46rpx;
    left: 46rpx;
  }
}
.filter {
  height: 100rpx;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  line-height: 100rpx;
  .active {
    color: @red;
  }
}
.goods-list {
  margin-top: 220rpx;
  li {
    height: 260rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    img {
      width: 200rpx;
      height: 200rpx;
      margin-left: 20rpx;
    }
    .right {
      flex: 1;
      flex-direction: column;
      margin-left: 50rpx;
      .goods-title {
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        margin-bottom: 84rpx;
        font-size: 32rpx;
      }
      .goods-price {
        color: @red;
        margin: 0 35rpx 0 28rpx;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
}
.bottom {
  color: #ddd;
  text-align: center;
  margin: 10rpx 0;
}
</style>