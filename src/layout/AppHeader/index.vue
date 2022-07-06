<script setup>
import { userStore } from '@/store/modules/user'

const user = userStore()
const router = useRouter()

const logout = () => {
  user.logout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <div class="app-header">
    <div class="title">
      <img src="@/assets/images/logo.png" alt="" />
      <p>FishDay</p>
    </div>
    <el-dropdown class="dropdown">
      <span class="dropdown__title"> FishDay </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 0 10px;
  height: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 48px;
    height: 48px;
  }
  p {
    padding-left: 15px;
    font-size: 30px;
    font-weight: bold;
    color: #34495e;
    white-space: nowrap;
  }
}
</style>
