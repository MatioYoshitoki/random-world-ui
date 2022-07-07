<template>
  <el-input v-model="message" type="textarea" placeholder="请输入内容"></el-input>
  <!--  <template v-for="kv in fishDataMap">-->
  <!--    <fish-card :fish-data="kv.value" />-->
  <!--  </template>-->
  <template v-for="kv in fishDataMap">
    <fish-card v-bind="kv" :fish-data="kv" />
  </template>
</template>
<script>
import { userStore } from '@/store/modules/user'

export default {
  data() {
    return {
      user: userStore(),
      fishDataMap: {},
      status: '未连接',
      message: '',
      websock: new WebSocket(`ws://127.0.0.1:7777/enjoy?accessToken=${userStore().token}`)
    }
  },
  methods: {
    createSocket() {
      this.websock.onopen = () => {
        this.status = '连接服务器成功'
        this.sendMessage()
      }
      this.websock.onclose = () => {
        this.status = '服务器关闭'
        this.message = ''
      }
      this.websock.onmessage = (e) => {
        this.message = 'message:' + e.data + ''
        console.log(e.data)
        let dataJson = JSON.parse(e.data)
        this.dispatchMessage(dataJson)
      }
      console.log(this.message)
    },
    closeSocket() {
      this.websock && this.websock.close()
      this.websock = null
    },
    sendMessage() {
      this.websock.send('{ "type": "login" }')
    },
    dispatchMessage(data) {
      if (data['event_type'] === 'fish_heartbeat') {
        console.log(this.fishData)
        let fishData = data['fish_details']
        this.fishDataMap[fishData['id']] = fishData
      }
    }
  },
  created() {
    this.createSocket()
  }
}
</script>
<style lang="scss" scoped></style>
