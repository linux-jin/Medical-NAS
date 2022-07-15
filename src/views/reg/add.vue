<template>
  <div class="reg-add-wrapper">
    <van-nav-bar
      :title="editFlag ? '更新绑定' : '新增绑定'"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <van-form validate-first @submit="confirmBind">
      <van-field
        v-model.trim="relationsheep"
        label="关系"
        readonly
        placeholder="请选择（必填）"
        required
        :rules="[{ required: true, message: '请选择' }]"
        @click="showList('relationsheep', '关系')"
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
        value="身份证"
        placeholder="请选择（必填）"
      />
      <van-field
        v-model.trim="identificationCard"
        required
        rows="1"
        type="textarea"
        autosize
        label="身份证号"
        placeholder="请输入 （必填）"
        :rules="[
          { required: true, message: '请输入身份证号' },
          { pattern: cidPattern, message: '请输入正确的格式' }
        ]"
      />
      <van-field
        v-model.trim="gender"
        readonly
        required
        label="性别"
        placeholder="请输入 （必填）"
        :rules="[{ required: true }]"
        @click="showList('gender', '性别')"
      />
      <van-field
        v-model.trim="phone"
        label="移动电话"
        required
        placeholder="请输入（必填）"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: phonePattern, message: '请输入正确的格式' }
        ]"
      />
      <van-field
        label="所在城市"
        readonly
        clickable
        rows="1"
        type="textarea"
        autosize
        :value="region"
        is-link
        required
        :rules="[{ required: true }]"
        placeholder="请选择（必填）"
        @click="showArea = true"
      />
      <van-field
        v-show="region || editFlag"
        label="所属街道"
        readonly
        :value="street"
        is-link
        required
        :rules="[{ required: true }]"
        placeholder="请选择（必填）"
        @click="showList('street', '街道')"
      />
      <van-field
        v-show="street || editFlag"
        label="所属社区"
        readonly
        :value="community"
        is-link
        required
        :rules="[{ required: true }]"
        placeholder="请选择（必填）"
        @click="showList('community', '社区')"
      />
      <van-field
        label="详细地址"
        v-model.trim="address"
        required
        placeholder="请输入（必填）"
        :rules="[{ required: true }]"
      />
      <van-field
        label="职业"
        readonly
        v-model.trim="career"
        placeholder="请选择"
        :rules="[{ required: false }]"
        @click="showList('career', '职业')"
      />
      <van-field
        label="工作单位"
        v-model.trim="job"
        placeholder="请输入"
        :rules="[{ required: false }]"
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
        v-if="filterPopList.length"
      >
        <van-cell-group>
          <van-cell
            v-for="item in filterPopList"
            :key="item.value"
            :title="item.label"
            @click="listClick(item)"
          />
        </van-cell-group>
      </van-list>
      <van-empty description="暂无数据" />
    </van-popup>
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
const genderList = [
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
      genderList,
      allList: [],
      relationsheepList: [],
      careerList: [],
      streetList: [],
      communityList: [],
      relationsheep: '',
      relationsheepId: '',
      name: '',
      gender: genderList[0].label,
      genderId: genderList[0].value,
      idcardType: '0',
      identificationCard: '',
      phone: '',
      region: '',
      regionId: '',
      street: '',
      streetId: '',
      community: '',
      communityId: '',
      address: '',
      career: '',
      careerId: '',
      job: '',
      listKey: '',
      listTitle: '',
      filterPopList: [],
      popListFlag: false,
      loading: false,
      finished: true,
      showArea: false,
      editFlag: false,
      cidPattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
      phonePattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    }
  },
  async created() {
    this.editFlag = Boolean(this.$route.query.edit)
    if (this.editFlag) {
      const res = await this.getOptionList()
      this.allList = res
      this.setInfo()
    }
  },
  methods: {
    async setInfo() {
      const obj = this.$route.query.obj
      const {
        relationsheep,
        name,
        identificationCard,
        gender,
        phone,
        region,
        street,
        community,
        address,
        career,
        job
      } = obj
      this.relationsheep = relationsheep
      const relationsheepArr = this.allList.filter(
        item => item.code === 'REL.0001'
      )
      this.relationsheep = this.getlabelFromArr(
        relationsheepArr,
        relationsheep
      )
      this.relationsheepId = relationsheep
      this.gender = this.getlabelFromArr(this.genderList, gender)
      this.genderId = gender
      this.regionId = region
      this.region = this.getArea()
      const streetArr = this.allList.filter(
        item => item.code === 'STREET.0001'
      )
      this.street = this.getlabelFromArr(streetArr, street)
      this.streetId = street
      const communityArr = this.allList.filter(
        item => item.code === 'COM.0001'
      )
      this.community = this.getlabelFromArr(communityArr, community)
      this.communityId = community
      const careerArr = this.allList.filter(
        item => item.code === 'CAREER.0001'
      )
      this.career = this.getlabelFromArr(careerArr, career)
      this.careerId = career
      this.name = name
      this.identificationCard = identificationCard
      this.phone = phone
      this.address = address
      this.job = job
    },
    getArea() {
      const area = this.regionId.split('/')
      const province = areaList.province_list[area[0]]
      const city = areaList.city_list[area[1]]
      const county = areaList.county_list[area[2]]
      return province + '/' + city + '/' + county
    },
    getlabelFromArr(arr, id) {
      const obj = arr.find(item => item.value === id)
      return obj?.label
    },
    async getOptionList(key) {
      let param = {}
      if (key === 'career') {
        param = {
          code: 'CAREER.0001'
        }
      } else if (key === 'relationsheep') {
        param = {
          code: 'REL.0001'
        }
      } else if (key === 'street') {
        const arr = this.regionId.split('/')
        param = {
          extend: arr[2]
        }
      } else if (key === 'community') {
        param = {
          extend: this.streetId
        }
      }
      try {
        const res = await await this.$api.regist.getOption(param)
        if (res.code === 0) {
          return res.data
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '查询失败' })
        return []
      }
    },
    onConfirm(values) {
      this.region = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      const arr = values
        .filter(item => !!item)
        .map(item => item.code)
        .join('/')
      this.regionId = arr
      this.showArea = false
    },
    async showList(key, title, type) {
      this.type = type
      this.listKey = key
      if (
        key === 'career' ||
        key === 'street' ||
        key === 'community' ||
        key === 'relationsheep'
      ) {
        this[key + 'List'] = await this.getOptionList(key)
      }
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
    async confirmBind() {
      const {
        relationsheepId,
        name,
        genderId,
        idcardType,
        identificationCard,
        phone,
        careerId,
        job,
        regionId,
        communityId,
        streetId,
        address
      } = this
      const param = {
        relationsheep: relationsheepId,
        name,
        gender: genderId,
        idcardType,
        identificationCard,
        phone,
        career: careerId,
        job,
        region: regionId,
        community: communityId,
        street: streetId,
        address,
        createTime: this.$moment(),
        unionId: this._storage.get('openid')
      }
      if (this.editFlag) param.id = this.$route.query.obj.id
      try {
        const res = await this.$api.regist.bindList(param)
        if (res.code === 0) {
          this.$notify({
            type: 'success',
            message: this.editFlag ? '更新成功' : '新增成功'
          })
          this.$router.go(-1)
        } else {
          throw new Error(res.message)
        }
      } catch (err) {
        this.$notify({ type: 'warning', message: err.message || '新增失败' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./add.less";
</style>
