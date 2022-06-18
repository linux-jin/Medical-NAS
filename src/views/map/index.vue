<template>
  <div class="map-wrapper">
    <van-nav-bar
      title="便民地图"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-empty image="error" description="暂时只支持在小程序中使用便民地图" />
  </div>
</template>
<script>
export default {
  name: 'Map'
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
