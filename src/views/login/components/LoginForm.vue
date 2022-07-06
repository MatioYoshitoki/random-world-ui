<script setup>
import { userStore } from '@/store/modules/user'

const user = userStore()
const router = useRouter()

const loginFormRef = ref()
const formData = reactive({ userName: '', password: '' })
const rules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loading = ref(false)

const onSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      user
        .login(formData)
        .then(() => {
          router.push('/dashboard')
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<template>
  <el-form
    ref="loginFormRef"
    :model="formData"
    :rules="rules"
    size="large"
    @keyup.enter="onSubmit(loginFormRef)"
  >
    <el-form-item prop="userName">
      <el-input v-model="formData.userName" placeholder="账户" size="large">
        <template #prefix>
          <i-ep-user />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="formData.password"
        placeholder="密码"
        type="password"
        show-password
        size="large"
      >
        <template #prefix>
          <i-ep-lock />
        </template>
      </el-input>
    </el-form-item>
    <el-button
      type="primary"
      style="width: 100%"
      :loading="loading"
      size="large"
      @click="onSubmit(loginFormRef)"
      >确 定</el-button
    >
  </el-form>
</template>

<style lang="scss" scoped></style>
