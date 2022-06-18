<template>
  <div class="codeshow-wrapper">
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
      <h3>{{ userInfo.name }}</h3>
      <p>{{ currentTime }}</p>
      <med-qrcode v-if="qrCodeValue" :text="qrCodeValue" />
      <van-empty v-else image="error" description="生成失败" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CodeShow',
  data() {
    return {
      userInfo: {},
      qrCodeValue: '',
      currentTime: ''
    }
  },
  created() {
    this.userInfo = this.$route.query.item
    this.timer = setInterval(() => {
      this.currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }, 16)
    this.getCodeInfo()
  },
  methods: {
    async getCodeInfo() {
      this.qrCodeValue = this.userInfo.identificationCard
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="less" scoped>
@import "./code.less";
</style>
