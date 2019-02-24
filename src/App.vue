<script>
  export default {
    created () {

      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
        })
      }

//    // 调用API从本地缓存中获取数据
//    const logs = wx.getStorageSync('logs') || []
//    logs.unshift(Date.now())
//    wx.setStorageSync('logs', logs)
//
//    console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style>

</style>
