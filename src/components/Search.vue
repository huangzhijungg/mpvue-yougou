<template>
  <div class="header">
    <input type="text"
           v-model.trim="keyword"
           confirm-type="go"
           @confirm="confirmHeader">
    <icon class="search-icon"
          type="search"
          size="16"
          confirm-type="go">
    </icon>
    <icon class="clear-icon"
          type="clear"
          size="16"
          color="#ccc"
          v-show="keyword"
          @click="keyword=''">
    </icon>
  </div>
</template>

<script>
export default {
  props: ['query'],
  data () {
    return {
      keyword: this.query
    }
  },
  methods: {
    confirmHeader () {
      // 回车触发事件,如果关键字为不为空,就向父组件传值
      if (this.keyword) {
        this.$emit('confirm', this.keyword)
      }
    }
  },
  watch: {
    query (newValue) {
      this.keyword = newValue
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: #fff;
    height: 60rpx;
    width: 720rpx;
    padding-left: 74rpx;
    box-sizing: border-box;
  }
  .search-icon {
    position: absolute;
    left: 44rpx;
  }

  .clear-icon {
    position: absolute;
    right: 44rpx;
    z-index: 100;
  }
}
</style>