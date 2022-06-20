<template>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left',
      router_data: []
    }
  },
  computed: {
    // 返回是否过度取消机制状态
    isIosMoveBack() {
      return this.$store.getters.getIsIosMoveBack
    }
  },
  mounted() {
    // 判断机型（IOS时返回true)
    if (this.isIOS()) {
      // 监听到滑动事件时设为true
      document.body.addEventListener(
        'touchmove',
        () => {
          // vuex 存储的状态
          this.$store.commit('setIsIosMoveBack', true)
        },
        false
      )
    }
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = false
    this.router_data.map((res, index) => {
      if (to.path === res) {
        isBack = true
        this.router_data.splice(index, 1)
      }
    })
    if (this.isIosMoveBack && isBack) {
      // 清除过渡效果
      this.transitionName = ''
      // 顺便重置监听状态
      this.$store.commit('setIsIosMoveBack', false)
    } else if (!this.isIosMoveBack && isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.router_data.push(from.path)
      this.transitionName = 'slide-left'
    }

    this.$router.isBack = false
    next()
  },
  methods: {
    // 是否ios
    isIOS() {
      var u = navigator.userAgent // 获取到的是个字符串，包括很多信息，我只匹配我想要的信息
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 判断是苹果手机
    }
  }
}
</script>

<style scoped>
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease;
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
