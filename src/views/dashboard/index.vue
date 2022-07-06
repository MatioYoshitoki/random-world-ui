<script setup>
import { userStore } from '@/store/modules/user'

const user = userStore()

const formData = reactive({
  // wsuri: '192.168.12.104:7777/enjoy',
  wsuri: '127.0.0.1:7777/enjoy',
  token: user.token,
  content: '{"type": "login"}'
})
let fishData = ref({})

const websock = ref()
const status = ref('未连接')
const message = ref()
const createSocket = () => {
  if (!websock.value) {
    status.value = '建立websocket连接'
    websock.value = new WebSocket('ws://' + formData.wsuri + `?accessToken=${formData.token}`)
    websock.value.onopen = () => {
      status.value = '连接服务器成功'
    }
    websock.value.onclose = () => {
      status.value = '服务器关闭'
      message.value = ''
    }
    websock.value.onmessage = (e) => {
      message.value = 'message:' + e.data + ''
      let dataJson = JSON.parse(e.data)
      if (dataJson['event_type'] === 'fish_heartbeat') {
        console.log(fishData)
        fishData.value = dataJson['fish_details']
      }
    }
    console.log(message.value)
  } else {
    status.value = 'websocket已连接'
  }
}
const closeSocket = () => {
  websock.value && websock.value.close()
  websock.value = null
}
const sendMessage = () => {
  let data
  try {
    data = formData.content
  } catch (error) {
    data = {}
  }
  websock.value.send(data)
}
</script>

<template>
  <el-form :model="formData" style="width: 600px">
    <el-form-item label="地址">
      <el-input v-model="formData.wsuri">
        <template #prepend>ws://</template>
      </el-input>
    </el-form-item>
    <el-form-item label="token">
      <el-input v-model="formData.token" disabled></el-input>
    </el-form-item>
    <el-form-item label="token">
      <el-input v-model="formData.content" type="textarea"></el-input>
    </el-form-item>
    <el-button type="primary" :disabled="!!websock" @click="createSocket">连接</el-button>
    <el-button type="primary" :disabled="!websock" @click="closeSocket">关闭</el-button>
    <el-button type="primary" :disabled="!websock" @click="sendMessage">发送数据</el-button>
  </el-form>
  <el-input v-model="message" type="textarea" placeholder="请输入内容"></el-input>
  <p>====</p>
  <el-card :model="fishData" class="fish-card" :header="fishData['name']">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <fish-card-item icon-url="src/assets/images/atk.png" :fish-value="fishData['atk']" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <fish-card-item icon-url="src/assets/images/def.png" :fish-value="fishData['def']" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div style="margin-left: 20px">
          <el-progress
            width="78"
            stroke-width="14"
            type="circle"
            :format="
              function () {
                return 'Hp'
              }
            "
            :color="
              function () {
                let per = (fishData['heal'] * 100) / fishData['max_heal']
                let result = '#00cd00'
                if (per < 30) {
                  result = '#FF0000'
                } else if (per < 70) {
                  result = '#EE7700'
                }
                return result
              }
            "
            :percentage="(fishData['heal'] * 100) / fishData['max_heal']"
          ></el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <fish-card-item
              icon-url="src/assets/images/earn_speed.png"
              :fish-value="fishData['earn_speed']"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <fish-card-item
              icon-url="src/assets/images/recover_speed.png"
              :fish-value="fishData['recover_speed']"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div style="margin-left: 20px">
          <el-progress
            width="78"
            stroke-width="14"
            type="circle"
            :format="
              function () {
                return 'Exp'
              }
            "
            :percentage="(fishData['money'] * 50) / fishData['weight']"
          ></el-progress>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.fish-card {
  width: 240px;
  height: 280px;
}
</style>
