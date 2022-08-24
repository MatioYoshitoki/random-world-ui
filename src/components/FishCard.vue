<template>
  <el-card class="fish-card">
    <el-row class="fish-card-header">
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
    <el-row style="margin-top: 20px" justify="space-around">
      <el-col v-if="fishData['status'] === 'ALIVE'" :span="24">
        <el-button
          style="width: 80px; margin-left: calc(50% - 40px); text-align: center"
          size="mini"
          plain
          @click="fishing(fishData['id'])"
          >捕捞</el-button
        >
      </el-col>
      <el-col v-else :span="24">
        <el-row>
          <el-col :span="12">
            <el-button
              style="width: 80px; margin-left: calc(50% - 40px); text-align: center"
              size="mini"
              plain
              >吃</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button
              style="width: 80px; margin-left: calc(50% - 40px); text-align: center"
              size="mini"
              plain
              >出售</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'FishCard',
  props: {
    fishData: {
      type: Object,
      required: true
    }
  },
  methods: {
    fishing(id) {
      console.log('fishing:' + id)
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
</style>
