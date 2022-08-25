<template>
  <el-button type="primary" @click="newFish">投放新鱼</el-button>
  <fish-dashboard :fish-data-map="fishDataMap" :parent-window="this" />
</template>
<script>
import { userStore } from '@/store/modules/user'
import { createFish, ownerFishList } from '@/api/fish'

export default {
  data() {
    return {
      user: userStore(),
      fishIdList: [],
      fishDataMap: {},
      status: '未连接',
      message: '',
      websock: new WebSocket(`ws://127.0.0.1:7777/enjoy?accessToken=${userStore().token}`)
    }
  },
  created() {
    this.initFishDashboard()
    this.createSocket()
  },
  methods: {
    initFishList(fishData) {
      if (this.fishIdList.indexOf(fishData['id']) === -1) {
        this.fishIdList.push(fishData['id'])
      }
      this.fishDataMap[this.fishIdList.indexOf(fishData['id'])] = fishData
    },
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
    newFish() {
      createFish()
    },
    async initFishDashboard() {
      console.log('try fetch')
      const res = await ownerFishList()
      const fishList = res.data
      for (let idx in fishList) {
        console.log(fishList[idx])
        this.initFishList(fishList[idx])
      }
    },
    dispatchMessage(data) {
      if (data['event_type'] === 'fish_heartbeat') {
        console.log(this.fishData)
        let fishData = data['fish_details']
        this.initFishList(fishData)
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
