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
            <img src="@/assets/Group (1).png" alt="Logo" />
            <h1 @click="goToMain" style="cursor: pointer;">DADOK</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#" class="Board" @click="goToBoard">게시판</a></li>
              <li><a href="#" class="monthbook" @click="goToMonthBook">이달의책</a></li>
              <li><a href="#" class="helpdesk" @click="goToHelpDesk">고객센터</a></li>
            </ul>
          </nav>
          <div class="profile">
            <a href="#"><img @click="goToMyPage" src="@/assets/profileicon.png" alt="Profile" /></a>
          </div>
        </div>
      </header>
  
      <main>
        <div class="pink-box">
          <div class="date-select">
            <select v-model="selectedDate" @change="changePage">
              <option value="2024-11">2024년 11월</option>
              <option value="2024-10">2024년 10월</option>
              <option value="2024-09">2024년 9월</option>
              <option value="2024-08">2024년 8월</option>
              <option value="2024-07">2024년 7월</option>
              <option value="2024-06">2024년 6월</option>
              <option value="2024-05">2024년 5월</option>
              <option value="2024-04">2024년 4월</option>
              <option value="2024-03">2024년 3월</option>
              <option value="2024-02">2024년 2월</option>
              <option value="2024-01">2024년 1월</option>
            </select>
          </div>
          6월의 책
        </div>
        <div class="book-section">
        <img src="@/assets/book2.jpg" alt="Book Cover" class="book-image" />
        <div class="book-info">
          <h2>
            테라피스트
            <span class="author-name">B. A. 패리스</span>
          </h2>
          <p>#소설 #장편소설</p>
          <div class="gray-box">
            《테라피스트》는 보안이 철저한 만큼 폐쇄적이며, 
            이웃과 끈끈한 만큼 서로를 감시하는 눈길을 거두지 않는 런던의 고급 주택 단지라는 특수한 배경에서 이야기가 펼쳐진다. 
            고통스러운 트라우마로 불안정한 심리 상태에 놓인 주인공 앨리스가 겪는 의문의 사건들은 
            현재와 과거의 시점이 교차하면서 예측하기 힘든 방향으로 천천히 달려간다. 
            의심과 불안이 극한에 달하는 순간 마주하는 반전은 그간 쌓아온 복선의 설계를 
            한눈에 파악할 수 있는 통쾌함과 시원함을, 오래 기다렸다 받는 선물처럼 기분 좋게 선사한다.
          </div>
        </div>
      </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDate: "2024-06"
      };
    },
    methods: {
      changePage() {
        // 선택된 날짜에 따라 페이지를 변경
        if (this.selectedDate === "2024-11") {
            this.$router.push({ name: "BookPage11" }); // Vue Router로 라우팅
          } else if (this.selectedDate === "2024-10") {
            this.$router.push({ name: "BookPage10" }); // Vue Router로 라우팅
          } else if (this.selectedDate === "2024-09") {
            this.$router.push({ name: "BookPage9" }); // Vue Router로 라우팅
          } else if (this.selectedDate === "2024-08") {
            this.$router.push({ name: "BookPage8" })
          } else if (this.selectedDate === "2024-07") {
            this.$router.push({ name: "BookPage7" });
          } else if (this.selectedDate === "2024-06") {
            this.$router.push({ name: "BookPage6" });
          } else if (this.selectedDate === "2024-05") {
            this.$router.push({ name: "BookPage5" });
          } else if (this.selectedDate === "2024-04") {
            this.$router.push({ name: "BookPage4" });
          } else if (this.selectedDate === "2024-03") {
            this.$router.push({ name: "BookPage3" });
          } else if (this.selectedDate === "2024-02") {
            this.$router.push({ name: "BookPage2" });
          } else if (this.selectedDate === "2024-01") {
            this.$router.push({ name: "BookPage1" });
          }
        
      },
      goToMain() {
        // MainPage로 라우팅
        this.$router.push({ name: "MainPage" });
      },
      goToJoin() {
        // JoinPage로 라우팅
        this.$router.push({ name: "JoinPage" });
      },
      goToLogin() {
        // LoginPage로 라우팅
        this.$router.push({ name: "LoginPage" });
      },
      goToMonthBook() {
        // MonthBookPage로 라우팅
        this.$router.push({ name: "BookPage11" });
      },
      goToMyPage() {
      // myPage로 라우팅
      this.$router.push({ name: "myPage" });
    },
    goToHelpDesk() {
      this.$router.push({ name: "HelpDesk" });
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
    justify-content: space-between;
    align-items: center;
    padding: 0% 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
  }
  
  /* 책으로 나를 다독이는 공간 */
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
  
  /* 하단 로고와 네비게이션 섹션 */
  .bottom-header {
    display: flex;
    justify-content: space-between;
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
  
  /* Main Styles */
  .pink-box {
    margin-top: 0;
    position: relative;
    width: 100%;
    height: 350px;
    background: linear-gradient(120deg, #ffbcbc, #ff8a8a, #ffbcbc);
    background-size: 300% 300%; /* 배경을 크게 설정하여 애니메이션 효과 가능 */
    animation: moveBackground 5s linear infinite; /* 애니메이션 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    color: white;
    font-weight: bold;
  }
  
  /* 배경 움직임 애니메이션 정의 */
  @keyframes moveBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .date-select {
    position: absolute;
    top: 10px;
    right: 50px;
  }
  
  select {
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
  }
  .book-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px;
  background-color: white;
}

.book-image {
  width: 200px;
  height: 100%;
  margin-right: 60px;
  box-shadow: 0px 8px 9px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  border-radius: 20px;
}

.book-info {
  max-width: 600px;
}

.book-info h2 {
  font-size: 48px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.author-name {
  font-size: 20px;
  margin-left: 10px;
  color: #555;
}

.book-info p {
  margin-bottom: 5px;
  color: #555;
}
.gray-box {
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 20px;
  color: #555;
  margin-top: 50px;
  font-size: 14px;
}
  </style>
  