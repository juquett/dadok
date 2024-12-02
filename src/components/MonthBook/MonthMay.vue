<!--10월이 기본-->

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
          5월의 책
        </div>
  
        <!-- 이미지와 텍스트가 배치될 영역 -->
        <div class="book-section">
          <img src="@/assets/book5month.jpg" alt="Book Cover" class="book-image" />
          <div class="book-info">
            <h2>
              달러구트 꿈 백화점
              <span class="author-name">이미예</span>
            </h2>
            <p>#소설 #장편소설</p>
            <div class="gray-box">
                잠들어야만 입장 가능한 꿈 백화점에서 일어나는 비밀스럽고도 기묘하며 가슴 뭉클한 판타지 소설.
                여기는 잠들어야만 입장할 수 있는 ‘달러구트 꿈 백화점’입니다. 
                잠들어야만 입장할 수 있는 독특한 마을. 그곳에 들어온 잠든 손님들에게 가장 인기 있는 곳은, 
                온갖 꿈을 한데 모아 판매하는 ‘달러구트의 꿈 백화점’이다. 긴 잠을 자는 사람들은 물론이고, 
                짧은 낮잠을 자는 사람들과 동물들로 매일매일 대성황을 이룬다.
                범상치 않은 혈통의 주인장 ‘달러구트’, 그리고 그의 최측근에서 일하게 된 신참 직원 ‘페니’,
                꿈을 만드는 제작자 ‘아가넵 코코’, 그리고 베일에 둘러싸인 비고 마이어스…등이 등장한다.
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
        selectedDate: "2024-05"
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
    background: linear-gradient(120deg, #f4c4b7, #ff9a8b, #f4c4b7);
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
  
  /* 이미지와 텍스트를 위한 스타일 */
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
  