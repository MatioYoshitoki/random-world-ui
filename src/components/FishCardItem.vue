<template>
  <el-row>
    <el-col :span="10">
      <el-image class="fish-value-icon" :src="iconUrl" />
    </el-col>
    <el-col :span="14">
      <div class="fish-value">{{ fishValue }}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'FishCardItem',
  props: {
    iconUrl: {
      type: String,
      required: true
    },
    fishValue: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.fish-value-icon {
  width: 32px;
  height: 32px;
  margin-top: 2px;
}
.fish-value {
  width: 32px;
  height: 32px;
  margin-top: 8px;
  text-align: center;
  vertical-align: middle;
}
</style>
