<template>
  <div class="code-wrapper">
    <van-nav-bar
      title="检测二维码"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-notice-bar
      left-icon="volume-o"
      text="温馨提示：您可将此二维码截图保存到相册，后续直接展示此图片，实现核酸登记。"
    />
    <div class="code">
      <med-qrcode v-if="qrCodeValue" :text="qrCodeValue" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Code',
  data() {
    return {
      qrCodeValue: ''
    }
  },
  created() {
    this.getCodeInfo()
  },
  methods: {
    getCodeInfo() {
      console.log('获取二维码信息')
      this.qrCodeValue = 123
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
