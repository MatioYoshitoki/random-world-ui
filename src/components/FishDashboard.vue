<template>
  <el-row>
    <el-col v-if="fishDataMap[0] != null" :span="8">
      <fish-card :fish-data="fishDataMap[0]" />
    </el-col>
    <el-col v-if="fishDataMap[1] != null" :span="8">
      <fish-card :fish-data="fishDataMap[1]" />
    </el-col>
    <el-col v-if="fishDataMap[2] != null" :span="8">
      <fish-card :fish-data="fishDataMap[2]" />
    </el-col>
  </el-row>
  <el-row>
    <el-col v-if="fishDataMap[3] != null" :span="8">
      <fish-card :fish-data="fishDataMap[3]" />
    </el-col>
    <el-col v-if="fishDataMap[4] != null" :span="8">
      <fish-card :fish-data="fishDataMap[4]" />
    </el-col>
    <el-col v-if="fishDataMap[5] != null" :span="8">
      <fish-card :fish-data="fishDataMap[5]" />
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'FishDashboard',
  props: {
    fishDataMap: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
