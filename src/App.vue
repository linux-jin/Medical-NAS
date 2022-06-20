<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  -webkit-overflow-scrolling: touch;
  & > * {
    -webkit-transform: translateZ(0px);
  }
}
</style>
