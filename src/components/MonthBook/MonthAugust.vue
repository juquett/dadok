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
          8월의 책
        </div>
        <div class="book-section">
        <img src="@/assets/book10.jpg" alt="Book Cover" class="book-image" />
        <div class="book-info">
          <h2>
            이기적 유전자
            <span class="author-name">리처드 도킨스</span>
          </h2>
          <p>#과학 #생물학</p>
          <div class="gray-box">
            저자는 이 책에서 인간을 포함한 모든 생명체는 DNA 또는 유전자에 의해 창조된 생존 기계이며, 
            자기의 유전자를 후세에 남기려는 이기적인 행동을 수행하는 존재라고 주장한다. 
            이러한 주장은 생물학계를 비롯해 과학계를 떠들썩하게 만들었고, 
            40년 동안 학계와 언론의 수많은 찬사와 논쟁의 대상이 되었다. 
            저자는 자신의 주장을 뒷받침하기 위해서 성의 진화, 이타주의의 본질, 협동의 진화, 적응의 범위, 
            무리의 발생, 가족계획, 혈연선택 등의 주요 쟁점과 게임 이론, 진화적으로 안정한 전략의 실험, 
            죄수의 딜레마, 박쥐 실험, 꿀벌 실험 등 방대한 현대 연구 이론과 실험을 보여 준다. 
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
        selectedDate: "2024-08"
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
      this.$router.push({ name: "PostListView" });
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
  