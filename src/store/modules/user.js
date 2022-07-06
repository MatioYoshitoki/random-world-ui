import { userLogin } from '@/api/user'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
  },

  actions: {
    async login(userInfo) {
      const res = await userLogin(userInfo)
      const { access_token } = res.data
      this.token = access_token
    },

    async logout() {
      this.$reset()
    }
  },

  persist: {
    enabled: true
  }
})
