<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="userId">User ID</label>
        <input type="text" id="userId" v-model="loginForm.userId" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginForm.password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        userId: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://172.16.104.25:8080/api/members/login', this.loginForm);
        console.log(response.data);  // 서버에서 반환된 로그인 결과 출력
        // 로그인 성공 후 처리 로직을 여기에 추가
      } catch (error) {
        console.error('Login failed:', error);
        // 로그인 실패 시 처리 로직을 여기에 추가
      }
    }
  }
};
</script>
