<template>
  <div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'MedQrCode',
  props: {
    width: {
      required: false,
      default: 200
    },
    height: {
      required: false,
      default: 200
    },
    text: {
      required: false,
      default: ''
    }
  },
  methods: {
    creatQrCode() {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.text,
        width: this.width,
        height: this.height,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  },
  mounted() {
    this.creatQrCode()
  }
}
</script>

<style lang="less" scoped>
.qrcode {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
