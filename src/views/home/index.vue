<template>
  <div class="home-index-wrapper">
    <div class="home-bg">
      <van-image :src="require('@/assets/images/nversion.gif')"></van-image>
    </div>
    <div class="home-tip">
      <h3>登记须知</h3>
      <p>
        1、请相关市民在系统中完成本人和家人的信息登记（确保信息真实准确），截图保存生成的
        二维码到手机 。
      </p>
      <p>
        2、在核酸采样时向工作人员出示二维码（或有效身份证件），有序进行核酸采样
      </p>
    </div>
    <div class="home-reg" @click="goReg">
      <i class="iconfont icon-userplus-fill"></i>
      <p><span>登记</span><span>添加您的家庭成员</span></p>
      <van-icon name="arrow" />
    </div>
    <div class="home-code" @click="goCode">
      <i class="iconfont icon-qrcode"></i>
      <p><span>检测二维码</span><span>出示您的检测二维码进行检测</span></p>
      <van-icon name="arrow" />
    </div>
    <div class="home-map" @click="goMap">
      <i class="iconfont icon-map"></i>
      <p><span>便民地图</span><span>展示您周边的核酸检测点</span></p>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import storage from 'store'
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {
    const openid = this.$route.query.openid
    storage.set('openid', openid)
  },
  methods: {
    goReg() {
      this.$router.push({
        path: '/reglist'
      })
    },
    goCode() {
      this.$router.push({
        path: '/code'
      })
    },
    goMap() {
      this.$router.push({
        path: '/map'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
