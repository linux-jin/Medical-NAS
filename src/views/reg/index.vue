<template>
  <div class="reg-list-wrapper">
    <van-nav-bar title="绑定列表" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="add-o" @click="add" />
      </template>
    </van-nav-bar>
    <div class="list" v-if="list.length">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="goDetail(item)">
          <van-swipe-cell>
            <van-card :title="item.name">
              <template #thumb>
                <img src="@/assets/images/man.png" alt="" />
              </template>

              <template #price>
                <van-button
                  round
                  type="primary"
                  class="codeBtn"
                  @click.stop="showCode(item)"
                >
                  检测码
                </van-button>
                <van-button round type="danger" @click.stop="unbindCode(item)">
                  解绑
                </van-button>
              </template>
            </van-card>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
    <van-empty v-else description="暂无相关信息">
      <van-button type="primary" class="reg-list-button">
        点击新增
      </van-button>
    </van-empty>
  </div>
</template>
<script>
export default {
  name: 'RegList',
  data() {
    return {
      list: [
        {
          id: 1,
          name: '爸爸'
        },
        {
          id: 2,
          name: '妈妈'
        },
        {
          id: 3,
          name: '本人'
        },
        {
          id: 4,
          name: '妻子'
        },
        {
          id: 5,
          name: '儿子'
        },
        {
          id: 6,
          name: '女儿'
        },
        {
          id: 7,
          name: '爷爷'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('获取列表')
    },
    add() {
      this.$router.push({
        path: '/regadd'
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    showCode() {},
    unbindCode() {}
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
