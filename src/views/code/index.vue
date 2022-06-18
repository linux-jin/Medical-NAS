<template>
  <div class="code-wrapper">
    <van-nav-bar
      title="检测二维码"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-notice-bar
      v-if="list.length === 1"
      left-icon="volume-o"
      text="温馨提示：您可将此二维码截图保存到相册，后续直接展示此图片，实现核酸登记。"
    />
    <div class="list" v-if="list.length > 1">
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
              </template>
            </van-card>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
    <div class="code" v-else-if="list.length === 1">
      <h3>{{ userInfo.name }}</h3>
      <p>{{ currentTime }}</p>
      <med-qrcode v-if="qrCodeValue" :text="qrCodeValue" />
      <van-empty v-else image="error" description="生成失败" />
    </div>
    <van-empty v-else description="暂无成员，请先去添加" />
  </div>
</template>
<script>
export default {
  name: 'Code',
  data() {
    return {
      userInfo: {},
      qrCodeValue: '',
      relation: '',
      list: [],
      currentTime: ''
    }
  },
  async created() {
    await this.getRelation()
    await this.getList()
    this.timer = setInterval(() => {
      this.currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }, 16)
  },
  methods: {
    showCode(item) {
      this.$router.push({
        path: '/code/' + item.identificationCard,
        query: {
          item: item
        }
      })
    },
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
          if (res.data.length === 1) {
            this.userInfo = this.list[0]
            this.qrCodeValue = this.userInfo.identificationCard
          }
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '查询失败' })
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
