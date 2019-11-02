<template>
  <div>
    <!-- 对头部样式进行封装,方便多个组件之间进行复用 -->
    <!-- 头部 -->
    <div class="topBar">
      <div class="search">
        <icon type="search"
              size="16"
              color="#bbb" />
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
</style>