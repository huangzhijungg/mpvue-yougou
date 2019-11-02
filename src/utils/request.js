const BASE_URL = 'https://www.uinav.com'

export default function request (options) {
  return new Promise((resolve, reject) => {
    // 设置数据还未返回时的loading动画
    if (!options.noLoading) {
      wx.showLoading({
        title: 'Loading...' // 提示的内容,
      })
    }
    wx.request({
      url: `${BASE_URL}${options.url}`, // 开发者服务器接口地址",
      data: options.data || {}, // 请求的参数",
      method: options.method,
      success: res => {
        // 对相同解构发送请求进行封装
        // 对返回数据进行解构
        const {meta, message} = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        // 不管成功或失败都会结束动画
        wx.hideLoading()
      }
    })
  })
}
