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
          7월의 책
        </div>
        <div class="book-section">
        <img src="@/assets/book7month.jpg" alt="Book Cover" class="book-image" />
        <div class="book-info">
          <h2>
            토마토 컵라면
            <span class="author-name">차정은</span>
          </h2>
          <p>#시 #에세이</p>
          <div class="gray-box">
            미화되는 계절, 가장 사랑했던 어느 여름날의 추억을 시로써 풀어냈다. 
            사랑했던 한여름의 태양이 타오르고, 한철 식어버린 여름의 아름다운 부분을 이야기했다.
             뜨겁게 내려오는 땀줄기가 보이지 않는 듯, 여름과의 깊은 사랑을 가볍게 눌러 담았다.
            여름은 뜨겁고 습하고 끈적거리는 계절을 한탄하지만, 겨울은 여름의 따뜻한 시선을 시샘한다. 
            우리는 한탄하고 시샘하는 여름에 무슨 추억을 남겼는지 더위가 다 지고 나서야 알아차린다. 
            여름의 텁텁하고 서투른 글자들에 한철 식은 추억을 하나둘 눌러 담았다. 
            나의 사랑 가득한 여름 이야기에는 언제나 쌉쌀한 토마토의 향기가 잔뜩 퍼진다. 
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
        selectedDate: "2024-07"
      };
    },
    methods: {
      changePage() {
        // 선택된 날짜에 따라 페이지를 변경
        if (this.selectedDate === "2024-09") {
            this.$router.push({ name: "MonthSeptember" }); // Vue Router로 라우팅
          } else if (this.selectedDate === "2024-10") {
            this.$router.push({ name: "MonthBookPage" }); // Vue Router로 라우팅
          } else if (this.selectedDate === "2024-08") {
            this.$router.push({ name: "MonthAugust" })
          } else if (this.selectedDate === "2024-07") {
            this.$router.push({ name: "MonthJuly" });
          } else if (this.selectedDate === "2024-06") {
            this.$router.push({ name: "MonthJune" });
          } else if (this.selectedDate === "2024-05") {
            this.$router.push({ name: "MonthMay" });
          } else if (this.selectedDate === "2024-04") {
            this.$router.push({ name: "MonthApril" });
          } else if (this.selectedDate === "2024-03") {
            this.$router.push({ name: "MonthMarch" });
          } else if (this.selectedDate === "2024-02") {
            this.$router.push({ name: "MonthFebruary" });
          } else if (this.selectedDate === "2024-01") {
            this.$router.push({ name: "MonthJanuary" });
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
        this.$router.push({ name: "MonthBookPage" });
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
  