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
              <li><a href="#">고객센터</a></li>
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
          3월의 책
        </div>
  
        <!-- 이미지와 텍스트가 배치될 영역 -->
        <div class="book-section">
          <img src="@/assets/book3month.jpg" alt="Book Cover" class="book-image" />
          <div class="book-info">
            <h2>
              세이노의 가르침
              <span class="author-name">세이노</span>
            </h2>
            <p>#성공학 #자기계발</p>
            <div class="gray-box">
                피보다 진하게 살아라!
                이 책은 부자 되는 법을 가르치는 책이 아니다. 목차를 훑어보자. 재테크 기법 같은 것은 전혀 나오지 않는다. 
                이 책의 저자는 돈이 삶의 우열을 결정하지 않는다고 설파한다. 대신, 
                삶을 어떻게 살아갈지에 대한 고민을 나눈다. 스스로의 인생을 위해 삶의 자세부터 바로잡고, 
                ‘피보다 진하게 살라’ 한다. 세이노 사전에서 ‘노력’이란, 힘들고 어려운 일일수록 치열하게 열심히 해내는 것이다. 하기 싫었던 일조차 좋아질 만큼!
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
        selectedDate: "2024-03"
      };
    },
    methods: {
      changePage() {
        // 선택된 날짜에 따라 페이지를 변경
        if (this.selectedDate === "2024-09") {
          this.$router.push({ name: "BookPage9" }); // Vue Router로 라우팅
        } else if (this.selectedDate === "2024-10") {
          this.$router.push({ name: "BookPage10" }); // Vue Router로 라우팅
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
      goToBoard() {
        // BoardPage로 라우팅
        this.$router.push({ name: "BoardPage" });
      },
      goToMonthBook() {
        // MonthBookPage로 라우팅
        this.$router.push({ name: "BookPage10" });
      },
      goToMyPage() {
        // myPage로 라우팅
        this.$router.push({ name: "myPage" });
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
    margin-top: 00px;
    position: relative;
    width: 100%;
    height: 350px;
    background-color: #f4c4b7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    color: white;
    font-weight: bold;
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
  