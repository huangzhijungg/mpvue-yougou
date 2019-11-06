<template>
  <div class="wrapper">
    <!-- 轮播图 -->
    <swiper class="swipper"
            indicator-dots
            autoplay
            circular
            indicator-color="#ccc"
            indicator-active-color="#fff">
      <block v-for="(item, index) in goodsDetail.pics"
             :key="index">
        <swiper-item>
          <img class="swipper-item"
               :src="item.pics_big"
               alt="" @click="previewImage">
        </swiper-item>
      </block>
    </swiper>

    <!-- 价格区 -->
    <div class="goods-desc">
      <p class="price">￥{{goodsDetail.goods_price}}</p>
      <div class="list-name">
        <span class="left-name">{{goodsDetail.goods_name}}</span>
        <div class="right">
          <i class="iconfont icon-zhuanfa1"></i>
          <p>转发</p>
          <button open-type="share">转</button>
        </div>
      </div>
      <p class="express">快递: &nbsp;&nbsp;&nbsp;免运费</p>
    </div>

    <!-- 促销 -->
    <div class="promote">
      <p>促销 <span class="reduce">满300减30元</span> </p>
      <p>已选 <span class="color">黑色/S/1件</span> </p>
    </div>
    <!-- 送至 -->
    <div class="goto">
      <p>送至 <span>广东省 广州市 海珠区</span> </p>
    </div>

    <!-- 图文介绍 -->
    <div class="goods-detail">
      <div class="tabs">
        <span :class="{active:activeIndex===index}"
              @click="activeIndex=index"
              v-for="(item, index) in arrList"
              :key="index">{{item}}</span>
      </div>
      <div class="main">
        <div v-show="!activeIndex"
             v-html="goodsDetail.goods_introduce"></div>
        <div v-show="activeIndex">商品参数</div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="icon-text">
        <span class="iconfont icon-kefu1"></span>
        <span>联系客服</span>
        <button open-type="contact">1</button>
      </div>
      <div class="icon-text">
        <span class="iconfont icon-gouwuchekong"></span>
        <span @click="toCar">购物车</span>
      </div>
      <div class="btn add-cart-btn">加入购物车</div>
      <div class="btn buy-btn">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 商品详情信息
      goodsDetail: [],
      arrList: [
        '图文介绍',
        '规格参数'
      ],
      activeIndex: 0
    }
  },
  // 获取页面传过来的商品id
  onLoad (options) {
    console.log(options.goodsId)
    // 获取商品详情页信息
    this.getGoodsDetail(options.goodsId)
  },
  // 分享方法
  onShareAppMessage () {
    return {
      title: this.goodsDetail.goods_name,
      imageUrl: this.goodsDetail.pics[0].pics_big
    }
  },
  methods: {
    // 跳转到购物车页面
    toCar () {
      wx.switchTab({ url: '/pages/cart/main' })
    },
    // 获取详情数据
    getGoodsDetail (goodsId) {
      this.$request({
        url: `/api/public/v1/goods/detail?goods_id=${goodsId}`
      }).then(data => {
        console.log(data)
        this.goodsDetail = data
      })
    },
    // 图片预览
    previewImage (index) {
      let urls = []
      this.goodsDetail.pics.forEach(v => {
        urls.push(v.pics_big)
      })
      // 图片预览方法
      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="less">
@import url('../../../static/css/css.less');
.wrapper {
  background-color: #f4f4f4;
  padding-bottom: 98rpx;

  .swipper {
    background-color: #fff;
    height: 720rpx;

    .swipper-item {
      height: 720rpx;
    }
  }
}
.goods-desc {
  padding: 40rpx 0 30rpx 20rpx;
  background-color: #fff;
  .price {
    color: #eb4450;
    font-size: 24px;
    font-weight: bold;
  }
  .list-name {
    // height: 80rpx;
    display: flex;
    margin-top: 40rpx;
    .left-name {
      flex: 1;
      color: #333;
      overflow: hidden;
      padding-right: 78rpx;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
    }
    .right {
      display: flex;
      width: 142rpx;
      border-left: 1px solid #ddd;
      flex-direction: column;
      align-items: center;
      color: #999;

      button {
      position: absolute;
      opacity: 0;
    }
    }
  }
  .express {
    margin-top: 36rpx;
    color: #999;
    font-size: 14px;
  }
}
.promote {
  height: 196rpx;
  margin: 20rpx 0 20rpx 20rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .reduce {
    color: #ff5d95;
    margin-left: 40rpx;
  }
  .color {
    color: #98999c;
    margin-left: 40rpx;
  }
}
.goto {
  height: 98rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  p {
    margin-left: 20rpx;
    span {
      color: #9a9896;
      margin-left: 40rpx;
    }
  }
}
.goods-detail {
  margin-top: 20rpx;
  background-color: #fff;

  .tabs {
    display: flex;

    span {
      flex: 1;
      text-align: center;
      color: #404040;
      font-size: 38rpx;
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;

      &.active {
        color: #ff4055;
        border-bottom: 10rpx solid #ff2644;
      }
    }
  }
}

.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  background-color: #fff;

  .icon-text {
    flex: 2;
    font-size: 30rpx;
    color: #404040;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      position: absolute;
      opacity: 0;
    }
  }

  .btn {
    flex: 3;
    color: #fff;
    text-align: center;
    line-height: 98rpx;

    &.add-cart-btn {
      background-color: #ffb400;
    }

    &.buy-btn {
      background-color: #ff2d4a;
    }
  }
}
</style>