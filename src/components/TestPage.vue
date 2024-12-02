<template>
  <div class="my-page">
    <h1>마이페이지</h1>
    <div v-if="user">
      <p><strong>아이디:</strong> {{ user.userId }}</p>
      <p><strong>아이디:</strong> {{ user.userid }}</p>
      <p><strong>닉네임:</strong> {{ user.nickname }}</p>
    </div>
    <div v-else>
      <p>로그인 후 마이페이지를 확인할 수 있습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // 유저 정보
    };
  },

  methods: {
    async checkLoginStatus() {
      try {
        const response = await this.$axios.get('/mypage'); // 로그인된 사용자 정보를 가져오는 API
        console.log('서버 응답 데이터:', response.data); // 디버깅용 로그
        if (response.data) {
          this.user = response.data; // 로그인된 유저 정보 저장
        } else {
          this.user = null; // 로그인되지 않은 상태
        }
      } catch (error) {
        console.log('로그인 상태 확인 에러:', error);
        this.user = null; // 로그인되지 않은 상태
      }
    }
  },

  created() {
    this.checkLoginStatus(); // 페이지가 로드되면 로그인 상태 확인
  },
};
</script>

<style scoped>
.my-page {
  padding: 20px;
}

h1 {
  font-size: 24px;
}

p {
  font-size: 18px;
}
</style>
