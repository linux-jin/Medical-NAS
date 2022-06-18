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
      <van-button type="primary" class="reg-list-button" @click="add">
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
      list: [],
      relation: []
    }
  },
  async created() {
    await this.getRelation()
    await this.getList()
  },
  methods: {
    async getRelation() {
      try {
        const res = await await this.$api.regist.getOption({
          code: 'REL.0001'
        })
        if (res.code === 0) {
          this.relation = res.data
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '查询失败' })
      }
    },
    async getList() {
      const param = {
        unionId: this._storage.get('openid')
      }
      try {
        const res = await this.$api.regist.getList(param)
        if (res.code === 0) {
          this.list = res.data.map(item => {
            const relation = this.relation.find(
              el => el.value === item.relationsheep
            )
            return {
              ...item,
              name: item.name + '(' + relation.label + ')'
            }
          })
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '查询失败' })
      }
    },
    add() {
      this.$router.push({
        path: '/regadd'
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    async unbindCode(item) {
      const param = {
        ...item
      }
      try {
        const res = await this.$api.regist.unbindList(param)
        if (res.code === 0) {
          this.$notify({ type: 'warning', message: '解绑成功' })
          this.getList()
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '解绑失败' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
