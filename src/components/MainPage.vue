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
          <a href="#"><img src="@/assets/profileicon.png" alt="Profile" /></a>
        </div>
      </div>
    </header>

    <main>
      <!-- 이미지 슬라이더 -->
      <div class="slider-container">
        <div class="slider-header">BEST 9</div> <!-- 왼쪽 상단에 텍스트 추가 -->
        <button @click="prevSlide" class="arrow left">‹</button>

        <div class="slider">
          <div
            class="slider-item"
            v-for="(image, index) in images"
            :key="index"
            :style="{ transform: `translateX(-${currentIndex * 100 / 3}%)` }"
            v-show="Math.floor(index / 3) === currentGroup"
          >
            <img :src="image" alt="slider image" />
          </div>
        </div>

        <button @click="nextSlide" class="arrow right">›</button>
      </div>
      <div id="app">
        <h1 class="center-text">도서 추천</h1>
        --text--
      </div>
    </main>
  </div>
</template>
  
  
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      currentGroup: 0, // 현재 보여줄 이미지 그룹
      images: [
        require('@/assets/book1.jpg'), // 첫 번째 이미지 // 모든 이미지 크기 조정해야함
        require('@/assets/book2.jpg'), // 두 번째 이미지
        require('@/assets/book3.jpg'), // 세 번째 이미지
        require('@/assets/book4.jpg'), // 네 번째 이미지
        require('@/assets/book5.jpg'), // 다섯 번째 이미지
        require('@/assets/book6.jpg'), // 여섯 번째 이미지
        require('@/assets/book7.jpg'), // 일곱 번째 이미지
        require('@/assets/book8.jpg'), // 여덟 번째 이미지
        require('@/assets/book9.jpg'), // 아홉 번째 이미지
      ],
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval);
  },
  methods: {
    nextSlide() {
      if (this.currentGroup < Math.ceil(this.images.length / 3) - 1) {
        this.currentGroup++;
      } else {
        this.currentGroup = 0; // 마지막 슬라이드에서 다시 처음으로
      }
    },
    prevSlide() {
      if (this.currentGroup > 0) {
        this.currentGroup--;
      } else {
        this.currentGroup = Math.ceil(this.images.length / 3) - 1; // 첫 슬라이드에서 마지막으로
      }
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // 3초마다 자동으로 다음 슬라이드로 이동
    },
    goToJoin() {
      // JoinPage로 라우팅
      this.$router.push({ name: "JoinPage" });
    },
    goToMain() {
      // MainPage로 라우팅
      this.$router.push({ name: "MainPage" });
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
  },
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
  
  /* main style - 이미지 슬라이더 스타일링 */
  .slider-container {
    position: relative;
    width: 1200px;
    height: 400px;
    overflow: hidden;
    margin: 20px auto;
    background-color: #FCC8BB; /* 분홍색 배경 */
    border-radius: 20px; /* 박스 모서리 둥글게 */
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 박스 그림자 */
    display: flex; /* 플렉스 컨테이너로 설정 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
  }
  
  .slider-header {
    position: absolute;
    top: 15px;
    left: 40px;
    font-size: 20px;
    color: white;
    font-weight: bold;
  }
  
  .slider {
    display: flex;
    transition: transform 20ms ease;
    align-items: center; /* 슬라이더 아이템 안의 콘텐츠 세로 중앙 정렬 */
  }
  
  .slider-item {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    min-width: 30%;
    height: 100%; /* 부모 컨테이너 높이에 맞추기 */
    margin: 0;
    padding: 0;
    border-radius: 15px; /* 박스 모서리 둥글게 */
  }
  
  .slider-item img {
    max-width: 55%; /* 이미지가 부모 요소의 가로 크기를 넘지 않게 */
    max-height: 50%; /* 이미지가 부모 요소의 세로 크기를 넘지 않게 */
    object-fit: contain; /* 이미지 비율 유지하면서 부모 박스에 맞춤 */
    display: block; /* 블록 요소로 변경 */
  }
  
  /* 화살표 스타일 */
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #FCC8BB;
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    z-index: 10;
  }
  
  .left {
    left: 10px;
  }
  
  .right {
    right: 10px;
  }
  
  .center-text {
    text-align: center;
  }
  </style>
  