<template>
  <div class="reg-add-wrapper">
    <van-nav-bar
      title="新增绑定"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-form validate-first @submit="confirmBind">
      <van-field
        v-model.trim="relation"
        label="关系"
        placeholder="请选择（必填）"
        required
        :rules="[{ required: true, message: '请选择' }]"
        @click="showList('relation', '关系')"
      />
      <van-field
        v-model.trim="name"
        required
        label="姓名"
        placeholder="请输入 （必填）"
        :rules="[{ required: true }]"
      />
      <van-field
        label="证件类型"
        readonly
        rows="1"
        type="textarea"
        autosize
        value="身份证"
        placeholder="请选择（必填）"
      />
      <van-field
        v-model.trim="cid"
        required
        rows="1"
        type="textarea"
        autosize
        label="身份证号"
        placeholder="请输入 （必填）"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model.trim="sex"
        required
        rows="1"
        type="textarea"
        autosize
        label="性别"
        placeholder="请输入 （必填）"
        :rules="[{ required: true }]"
        @click="showList('sex', '性别')"
      />
      <van-field
        v-model.trim="mobphone"
        label="移动电话"
        required
        placeholder="请输入（必填）"
        :rules="[{ required: true }]"
      />
      <van-field
        label="居住地址"
        readonly
        clickable
        rows="1"
        type="textarea"
        autosize
        :value="regaddr"
        is-link
        required
        :rules="[{ required: true }]"
        placeholder="请选择（必填）"
        @click="showArea = true"
      />
      <van-field
        label="详细地址"
        v-model.trim="regaddrDetail"
        required
        placeholder="请输入（必填）"
        :rules="[{ required: true }]"
      />
      <div class="sureBtn">
        <van-button round block type="primary" native-type="submit">
          确认绑定
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
    <van-popup
      class="searchlist-wrapper"
      v-model.trim="popListFlag"
      position="bottom"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      :close-on-click-overlay="false"
      @close="closePopList"
      :style="{ height: '90%' }"
    >
      <h3>{{ listTitle }}</h3>
      <van-list
        v-model.trim="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="searchlist"
      >
        <van-cell-group>
          <van-cell
            v-for="item in filterPopList"
            :key="item.value"
            :title="item.label"
            @click="listClick(item)"
          ></van-cell>
        </van-cell-group>
      </van-list>
    </van-popup>
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
const relationList = [
  {
    value: '0',
    label: '本人'
  },
  {
    value: '1',
    label: '妻子'
  },
  {
    value: '2',
    label: '父亲'
  },
  {
    value: '3',
    label: '母亲'
  },
  {
    value: '4',
    label: '子女'
  },
  {
    value: '5',
    label: '爷爷'
  },
  {
    value: '6',
    label: '奶奶'
  }
]
const sexList = [
  {
    value: '0',
    label: '男'
  },
  {
    value: '1',
    label: '女'
  }
]
export default {
  name: 'RegAdd',
  data() {
    return {
      areaList,
      relationList,
      sexList,
      relation: relationList[0].label,
      relationId: relationList[0].value,
      name: '',
      sex: sexList[0].label,
      sexId: sexList[0].value,
      cardTypeText: '0',
      cid: '',
      mobphone: '',
      regaddr: '',
      regaddrDetail: '',
      listKey: '',
      listTitle: '',
      filterPopList: [],
      popListFlag: false,
      loading: false,
      finished: true,
      showArea: false
    }
  },
  methods: {
    onConfirm(values) {
      this.regaddr = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showArea = false
    },
    showList(key, title, type) {
      this.type = type
      this.listKey = key
      this.filterPopList = this[key + 'List']
      this.listTitle = '请选择' + title
      this.popListFlag = true
    },
    listClick(item) {
      this[this.listKey] = item.label
      this[this.listKey + 'Id'] = item.value
      this.popListFlag = false
    },
    closePopList() {
      this.listKey = ''
      this.listTitle = ''
      this.popListFlag = false
    },
    confirmBind() {
      const {
        relation,
        relationId,
        name,
        sex,
        sexId,
        cardTypeText,
        cid,
        mobphone,
        regaddr,
        regaddrDetail
      } = this
      const param = {
        relation,
        relationId,
        name,
        sex,
        sexId,
        cardTypeText,
        cid,
        mobphone,
        regaddr,
        regaddrDetail
      }
      console.log('确定绑定调接口', param)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import "./add.less";
</style>
