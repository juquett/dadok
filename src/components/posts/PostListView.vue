<template>
  <div id="app">
    <header>
      <!-- 상단 로그인, 회원가입 -->
      <div class="top-header">
        <div class="lefttop">책으로 나를 다독이는 공간</div>
        <div class="auth">
          <div v-if="isAuthenticated">
            <a href="#" class="logout" @click="logout">로그아웃</a>
          </div>
          <div v-else>
            <a href="#" class="login" @click="goToLogin">로그인</a>
            <a href="#" class="signup" @click="goToJoin">회원가입</a>
          </div>
        </div>
      </div>

      <!-- 하단 로고와 네비게이션 메뉴 -->
      <div class="bottom-header">
        <div class="logo">
          <!-- DADOK 클릭 시 MainPage로 이동 -->
          <img src="@/assets/Group (1).png" alt="Logo" />
          <h1 @click="goToMain" style="cursor: pointer;">DADOK</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#" class="Board" @click="goToBoard">게시판</a></li>
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
      <section class="boardpage-form">
        <div class="form-board">
          <button class="btn" @click="goToBoard">게시판</button>
          <button class="btn2" @click="goToCreatePost">글쓰기</button>
        </div>
        <hr class="custom-line">

        <!-- 게시물 목록 -->
        <div class="post-list">
          <div class="post" v-for="(post, index) in posts" :key="index">
            <h3>{{ post.title }}</h3>
            <img :src="post.image" alt="Post Image" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [] // 게시물 목록을 저장할 배열
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    logout() {
    localStorage.removeItem('token'); // 로컬 스토리지에서 JWT 삭제
    this.$store.commit('logout'); // Vuex 상태 갱신
    this.$router.push('/'); // 로그인 페이지로 리디렉션
  },
    goToMain() {
      this.$router.push({ name: 'MainPage' });
    },
    goToJoin() {
      this.$router.push({ name: 'JoinPage' });
    },
    goToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    goToBoard() {
      // BoardPage로 라우팅
      this.$router.push({ name: "PostListView" });
    },
    goToMonthBook() {
      this.$router.push({ name: 'BookPage10' });
    },
    goToMyPage() {
      this.$router.push({ name: "myPage" });
    },
    goToCreatePost() {
      this.$router.push({ name: "PostCreateView" });
    }
    
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
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

.lefttop {
  font-size: 12px;
  color: #a1a1a1;
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
.auth .logout {
    margin-right: 60px;
    background-color: #f4c4b7;
    padding: 5px 15px;
    border-radius: 5px;
    color: white;
  }
/* 하단 로고와 네비게이션 섹션 */
.bottom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  color: #f4c4b7;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
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

/* Main Section Styles */
.boardpage-form {
  margin-top: 10px;
  text-align: center;
  padding: 50px 250px; /* 양쪽 여백 추가 (20px) */
}

.form-board {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* 버튼들이 줄 바꿈이 가능하도록 설정 */
}

.btn, .btn2 {
  width: 100px; /* 버튼의 고정 폭 설정 */
  height: 45px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 0 100px; /* 버튼 간격 조정 */
}

.btn {
  background-color: #f4c4b7;
}

.btn2 {
  background-color: #C0C0C0;
}

.btn:hover {
  background-color: #e3a999;
}

.btn2:hover {
  background-color: #848484;
}

.custom-line {
  border: 0;
  height: 1px; /* 선의 두께 */
  background-color: #000000; /* 선의 색상 */
  margin: 20px 0; /* 선의 위아래 여백 */
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .boardpage-form {
    padding: 50px 10px; /* 여백 조정 */
  }

  .btn {
    width: 120px; /* 버튼의 크기 조정 */
  }

  .btn2 {
    width: 120px; /* 버튼의 크기 조정 */
  }

  .bottom-header {
    padding: 0 20px; /* 하단 헤더의 여백 조정 */
  }
}
.post-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  margin: 10px 0;
}

.post img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
