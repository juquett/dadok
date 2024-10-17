<template>
    <div id="app">
      <header>
        <!-- 상단 로그인, 회원가입 -->
        <div class="top-header">
          <div class="lefttop">책으로 나를 다독이는 공간</div>
          <div class="auth">
            <a href="#" class="login" @click="goToLogin">로그인</a>
            <a href="#" class="signup" @click="goToJoin">회원가입</a>
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
    <h2>로그인</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">    
          <input type="text" id="id" placeholder="아이디" v-model="userId" /> <!-- userId로 수정 -->
      </div>
      <div class="form-group">
          <input type="password" id="password" placeholder="비밀번호" v-model="password" />
      </div>
      <div v-if="error" class="error-message">{{ error }}</div> <!-- 오류 메시지 표시 -->
      <div class="form-login">
        <button type="submit" class="submit-btn">로그인</button>
      </div>
      <div class="signup-prompt">
        <span>회원이 아니신가요?</span>
      </div>
      <div class="form-signup">
        <button @click="goToJoin" class="signup-btn">회원가입</button>
      </div>
    </form>
  </section>
</main>

    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        userId: '',
        password: '',
        error: ''
      };
    },
methods: {
  submitForm() {
    const loginData = { username: this.userId, password: this.password };

    // 로그인 요청 보내기
    this.$axios.post(`http://25.6.251.212:8080/login`, loginData)
      .then(response => {
        localStorage.setItem('token', response.data.token); // JWT 토큰 저장
        this.$store.commit('login'); // 로그인 상태 업데이트
        this.$router.push('/mypage'); // 로그인 후 마이페이지로 이동
      })
      .catch(err => {
        this.error = '로그인 실패: ' + err.response.data.message;
      });
  },
  logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },

      goToMain() {
        // MainPage로 라우팅
        this.$router.push({ name: 'MainPage' });
      },
      goToJoin() {
      // JoinPage로 라우팅
    this.$router.push({ name: 'JoinPage' });
    },
    goToLogin() {    
      // LoginPage로 라우팅
    this.$router.push({ name: 'LoginPage' });
    },
    goToMonthBook() {    
      // LoginPage로 라우팅
    this.$router.push({ name: 'BookPage10' });
    },
    goToMyPage() {
      // myPage로 라우팅
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
      margin-top: 20px;
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
      margin-bottom: 10px;
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
      width: 100%;
      padding: 10px;
      background-color: #f4c4b7;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      margin-bottom: 60px;
    }
    
    .submit-btn:hover {
      background-color: #e3a999;
    }
    .error-message {
  color: red; /* 오류 메시지 색상 */
  font-size: 14px; /* 폰트 크기 */
  margin-top: 10px; /* 위쪽 여백 */
}

    .signup-prompt {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #a1a1a1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.signup-prompt::before, 
.signup-prompt::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #eaeaea;
  margin: 0 10px;
}
.signup-btn {
    width: 100%;
      padding: 10px;
      background-color: #C0C0C0;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

.signup-btn:hover {
  background-color: #9e9e9e;
}
    </style>
    