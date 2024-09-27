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
            <li><a href="#">이달의책</a></li>
            <li><a href="#">고객센터</a></li>
          </ul>
        </nav>
        <div class="profile">
          <a href="#"><img src="@/assets/profileicon.png" alt="Profile" /></a>
        </div>
      </div>
    </header>

    <main>
      <section class="signup-form">
        <h2>회원가입</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nickname">닉네임 *</label>
            <input type="text" id="nickname" placeholder="닉네임" v-model="nickname" />
          </div>
          <div class="form-group">
            <label for="id">아이디 *</label>
            <input type="text" id="id" placeholder="아이디" v-model="id" />
          </div>
          <div class="form-group">
            <label for="password">비밀번호 *</label>
            <input type="password" id="password" placeholder="비밀번호" v-model="password" />
          </div>
          <button type="submit" class="submit-btn">가입하기</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  data() {
    return {
      nickname: '',
      id: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      alert('회원가입이 완료되었습니다!');
    },
    goToMain() {
      // MainPage로 라우팅
      this.$router.push({ name: 'MainPage' });
    },
    goToLogin() {    
      // LoginPage로 라우팅
    this.$router.push({ name: 'LoginPage' });
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
  </style>
  