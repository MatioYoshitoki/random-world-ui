<template>
  <el-card class="fish-card">
    <el-row v-if="fishData['status'] === 'ALIVE'" class="fish-card-header">
      <el-col :span="22">
        <div style="vertical-align: middle; font-size: 20px">
          {{ fishData['name'] }}
        </div>
      </el-col>
      <el-col :span="2">
        <el-button style="font-size: 18px; color: #515151" type="text">
          <i class="el-icon-s-fold" />
        </el-button>
      </el-col>
    </el-row>
    <el-row v-if="fishData['status'] === 'SLEEP'" class="fish-card-header">
      <el-col :span="6">
        <div style="vertical-align: middle; font-size: 20px">
          {{ fishData['name'] }}
        </div>
      </el-col>
      <el-col :span="16">
        <el-image class="fish-status-icon" src="src/assets/images/sleep_fish.png" />
      </el-col>
      <el-col :span="2">
        <el-button style="font-size: 18px; color: #515151" type="text">
          <i class="el-icon-s-fold" />
        </el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
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
            :width="78"
            :stroke-width="14"
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
            :width="78"
            :stroke-width="14"
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
    <el-row style="margin-top: 20px" justify="space-around">
      <el-col v-if="fishData['status'] === 'ALIVE'" :span="24">
        <el-button
          style="width: 60px; margin-left: calc(50% - 30px); text-align: center"
          size="small"
          plain
          @click="tryFishing(fishData['id'])"
          >捕捞</el-button
        >
      </el-col>
      <el-col v-else :span="24">
        <el-row>
          <el-col :span="8">
            <el-button
              style="width: 60px; text-align: center"
              size="small"
              plain
              @click="tryEatFish(fishData['id'])"
              >吃</el-button
            >
          </el-col>
          <el-col :span="8">
            <el-button
              style="width: 60px; text-align: center"
              size="small"
              plain
              @click="tryPutFish(fishData['id'])"
              >投放</el-button
            >
          </el-col>
          <el-col :span="8">
            <el-button style="width: 60px; text-align: center" size="small" plain>出售</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { fishing, eatFish, putFish } from '@/api/fish'
export default {
  name: 'FishCard',
  props: {
    fishData: {
      type: Object,
      required: true
    },
    parentWindow: {
      type: Object,
      required: true
    }
  },
  methods: {
    async tryFishing(id) {
      try {
        const res = await fishing(id)
        this.parentWindow.$notify.success({
          title: '成功',
          message: res.message
        })
      } catch (e) {
        this.parentWindow.$notify.error({
          title: '失败',
          message: e.message
        })
      }
    },
    async tryEatFish(id) {
      try {
        const res = await eatFish(id)
        this.parentWindow.$notify.success({
          title: '成功',
          message: res.message
        })
      } catch (e) {
        this.parentWindow.$notify.error({
          title: '失败',
          message: e.message
        })
      }
    },
    async tryPutFish(id) {
      try {
        const res = await putFish(id)
        console.log('put fish result: ' + res)
        this.parentWindow.$notify.success({
          title: '成功',
          message: res.message
        })
      } catch (e) {
        console.error(e)
        this.parentWindow.$notify.error({
          title: '失败',
          message: e.message
        })
      }
    }
  }
}
</script>
<style>
@import url('//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css');
.fish-card {
  width: 240px;
  height: 290px;
}
.fish-card-header {
  font-size: 15px;
  border-bottom: 1px solid;
  border-bottom-color: #515151;
  margin-top: -10px;
}
.fish-status-icon {
  width: 20px;
  height: 20px;
  margin-top: 2px;
}
</style>
