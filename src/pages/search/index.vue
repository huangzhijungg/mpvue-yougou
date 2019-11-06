<template>
  <div class="wrapper">
    <search @confirm="searchHeadler" />
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18" @click="clearAll">
        </icon>
      </div>
      <ul>
        <li v-for="(item,index) in searchHistory"
            :key="item"
            @click="clickSearch(item,index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      // 搜索历史
      searchHistory: wx.getStorageSync('searchHistory') || ['HUAWEI']
    }
  },
  onShow () {
    this.searchHistory = wx.getStorageSync('searchHistory') || []
  },
  methods: {
    searchHeadler (data) {
      let newSearchHistory = [...this.searchHistory]

      let searchList = newSearchHistory.filter(v => {
        return v !== data
      })
      searchList.unshift(data)

      // 存数据
      wx.setStorageSync('searchHistory', searchList)

      wx.navigateTo({ url: `/pages/list/main?keyword=` + data })
    },
    clickSearch (item, index) {
      let newSearchHistory = [...this.searchHistory]
      // 如果包含的话，先删除。直接插在前面
      newSearchHistory.splice(index, 1)

      newSearchHistory.unshift(item)
      // 存storage
      wx.setStorageSync('searchHistory', newSearchHistory)
      wx.navigateTo({ url: '/pages/list/main?keyword=' + item })
    },
    // 点击清空
    clearAll () {
      // 如果没有记录的情况下应该不触发点击事件
      if (this.searchHistory.length === '') {

      }
      wx.showModal({
        title: '提示', // 提示的标题,
        content: '是否确定要删除历史记录', // 提示的内容,
        showCancel: true, // 是否显示取消按钮,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            wx.removeStorageSync('searchHistory')
            this.searchHistory = []
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>