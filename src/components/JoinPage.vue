<template>
  <div id="app">
    <header>
      <!-- 상단 로그인, 회원가입 -->
      <div class="top-header">
        <div class="lefttop">책으로 나를 다독이는 공간</div>
        <div class="auth">
          <a href="#" class="login" @click="goToLogin">로그인</a>
          <a href="#" class="signup">회원가입</a>
        </div>
      </div>

      <!-- 하단 로고와 네비게이션 메뉴 -->
      <div class="bottom-header">
        <div class="logo">
          <!-- DADOK 클릭 시 MainPage로 이동 -->
          <img src="@/assets/logo.png" alt="Logo" />
          <h1 @click="goToMain" style="cursor: pointer;">DADOK</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">게시판</a></li>
            <li><a href="#" class="monthbook" @click="goToMonthBook">이달의책</a></li>
            <li><a href="#">고객센터</a></li>
          </ul>
        </nav>
        <div class="profile">
          <a href="#"><img @click="goToMyPage" src="@/assets/profileicon.png" alt="Profile" /></a>
        </div>
      </div>
    </header>

    <main>
      <section class="signup-form">
  <h2>회원가입</h2>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="username">닉네임 *</label>
      <input type="text" id="username" placeholder="닉네임" v-model="username" />
    </div>
    <div class="form-group">
      <label for="userid">아이디 *</label>
      <input type="text" id="userid" placeholder="아이디" v-model="userid" />
    </div>
    <div class="form-group">
      <label for="password">비밀번호 *</label>
      <input type="password" id="password" placeholder="비밀번호" v-model="password" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">비밀번호 확인 *</label>
      <input type="password" id="confirmPassword" placeholder="비밀번호 확인" v-model="confirmPassword" />
    </div>
    <button type="submit" class="submit-btn">가입하기</button>
  </form>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  <p v-if="successMessage" class="success">{{ successMessage }}</p>
</section>

    </main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'JoinPage',

  data() {
    return {
      username: '',
      userid: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
      
    };
  },
  methods: {
  // 비밀번호 일치 확인
  validatePassword() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "비밀번호가 일치하지 않습니다.";
      return false;
    }
    return true;
  },

  // 유효성 검사에 비밀번호 확인 추가
  validateForm() {
    if (!this.username || !this.userid || !this.password || !this.confirmPassword) {
      this.errorMessage = "모든 필드를 채워주세요.";
      return false;
    }

    // 비밀번호 확인
    if (!this.validatePassword()) {
      return false;
    }
    return true;
  },

  // 회원가입 폼 제출
  submitForm() {
    // 데이터 유효성 검사
    if (!this.validateForm()) {
      return;
    }

    const signupData = {
      username: this.username,
      userid: this.userid,
      password: this.password
    };

    axios.post(`http://172.16.111.168:3000/register`, signupData, { timeout: 5000 })
      .then(() => {
        this.successMessage = "회원가입이 성공적으로 완료되었습니다.";
        this.errorMessage = '';
        this.username = '';
        this.userid = '';
        this.password = '';
        this.confirmPassword = '';  // 비밀번호 확인 필드 초기화

        // 회원가입 성공 후 MainPage로 이동
        this.goToMain();
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          console.error('요청 시간 초과:', error.message);
          this.errorMessage = '서버 응답이 너무 오래 걸립니다. 다시 시도해주세요.';
        } else if (error.response) {
          console.error('서버 응답 오류:', error.response.data);
          this.errorMessage = `서버 오류: ${error.response.data.message}`;
        } else if (error.request) {
          console.error('응답 없음:', error.request);
          this.errorMessage = '서버 응답이 없습니다.';
        } else {
          console.error('요청 설정 오류:', error.message);
          this.errorMessage = '요청을 처리하는 중 오류가 발생했습니다.';
        }
      });
  },

  goToMain() {
    this.$router.push({ name: 'MainPage' });
  },
  goToLogin() {
    this.$router.push({ name: 'LoginPage' });
  },
  goToMonthBook() {
    this.$router.push({ name: 'BookPage10' });
  },
  goToMyPage() {
    this.$router.push({ name: "myPage" });
  },
  goToBoard() {
      // BoardPage로 라우팅
      this.$router.push({ name: "BoardPage" });
    },
}

};
</script>

<style scoped>
/* Global Styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

/* Header Styles */
header {
  background-color: white;
  border-bottom: 1px solid #eaeaea;
}

/* 상단 로그인/회원가입 섹션 */
.top-header {
  display: flex;
  justify-content: space-between;  /* 왼쪽과 오른쪽 요소를 끝에 배치 */
  align-items: center;  /* 세로 중앙에 정렬 */
  padding: 0% 30px;
  padding-bottom: 10px; /* 아래쪽에 여백 추가 */
  border-bottom: 1px solid #eaeaea;
}
/* 책으로 나를 다독이는 공간 */
.lefttop {
  font-size: 12px;
  color:#a1a1a1;
  margin-left: 65px;
}
.auth a {
  margin-left: 30px;
  text-decoration: none;
  color: black;
  font-size: 14px;
}
.auth .signup {
  margin-right: 60px;
  background-color: #f4c4b7;
  padding: 5px 15px;
  border-radius: 5px;
  color: white;
}

/* 하단 로고와 네비게이션 섹션 */
.bottom-header {
  display: flex;
  justify-content: space-between; /* 요소들을 양 끝에 배치 */
  align-items: center;
  padding: 0px 80px;
  color: #f4c4b7;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: -70px;
}

.logo img {
  height: 25px;
  margin-right: 7px;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 50px;
}

nav ul li a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}

.profile {
  margin-right: 25px;
}

.profile img {
  height: 35px;
  border-radius: 50%;
}

/* Main Signup Form Styles */
.signup-form {
  text-align: center;
  padding: 50px 0;
}

.signup-form h2 {
  font-size: 24px;
  margin-bottom: 30px;
}

form {
  display: inline-block;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.form-group input {
  width: 300px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
}
.form-group input::placeholder {
  color: #cacaca; 
}

.submit-btn {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #f4c4b7;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #e3a999;
}
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
