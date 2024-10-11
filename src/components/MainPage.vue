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
    <!-- 이미지 슬라이더 -->
    <div class="slider-container">
      <div class="slider-header"></div>
      <Carousel :itemsToShow="3" autoplay :autoplayTimeout="5000">
        <Slide v-for="(image, index) in images" :key="index">
          <img :src="image" alt="slider image" class="slider-image" />
        </Slide>
      </Carousel>
    </div>

    <div id="app">
      <h1 class="center-text">도서 추천</h1>
      <h2 class="center-text2">이런 책은 어떠신가요?</h2>
      <div ref="animateElement" class="scroll-animation">
  <div class="book-item book1">
    <img src="@/assets/book5.jpg" alt="book image" />
    <div class="book-info">완전한 행복<br>정유정</div>
  </div>
  <div class="book-item book2">
    <img src="@/assets/book7.jpg" alt="book image" />
    <div class="book-info">채식 주의자<br>한강</div>
  </div>
  <div class="book-item book3">
    <img src="@/assets/book4.jpg" alt="book image" />
    <div class="book-info">이중 하나는 거짓말<br>김애란</div>
  </div>
  <div class="book-item book4">
    <img src="@/assets/book3.jpg" alt="book image" />
    <div class="book-info">영원한 천국<br>정유정</div>
  </div>
</div>

    </div>
  </main>
  </div>
</template>
  
  
<script>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    Slide,
  },
  
  data() {
    return {
      currentIndex: 0,
      currentGroup: 0, // 현재 보여줄 이미지 그룹
      images: [
        require('@/assets/book5month.jpg'), // 첫 번째 이미지 // 모든 이미지 크기 조정해야함
        require('@/assets/book2.jpg'), // 두 번째 이미지
        require('@/assets/book4month.jpg'), // 세 번째 이미지
        require('@/assets/book7month.jpg'), // 네 번째 이미지
        require('@/assets/book1.jpg'), // 다섯 번째 이미지
        require('@/assets/book1month.jpg'), // 여섯 번째 이미지
        require('@/assets/book3month.jpg'), // 일곱 번째 이미지
        require('@/assets/book8.jpg'), // 여덟 번째 이미지
        require('@/assets/book2month.jpg'), // 아홉 번째 이미지
        require('@/assets/book10.jpg'), // 열 번째 이미지
      ],
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    observer.observe(this.$refs.animateElement);
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
    goToMyPage() {
      // myPage로 라우팅
      this.$router.push({ name: "myPage" });
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
  .slider-image {
  width: 55%;
  height: 90%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
}
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
    top: 10px;
    left: 15px;
    font-size: 25px;
    color: white;
    font-weight: bold;
  }
  .center-text {
    margin-top: 100px;
    text-align: center;
    font-weight: bold;
  }
  .center-text2 {
    margin-top: 20px;
    text-align: center;
    color: #a1a1a1;
    font-size: 20px;
  }
  
  .scroll-animation {
  margin-left: 100px;
  margin-top: 100px;
  margin-bottom: 200px;
  display: flex; /* 가로로 나열 */

  justify-content: flex-start; /* 왼쪽 정렬 */
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-animation.visible {
  opacity: 1;
  transform: translateY(0);
}
/* 기본 스타일 */
.book-item {
  position: relative; /* 자식 요소의 절대 위치 설정을 위해 필요 */
  width: 200px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.2);
  margin-right: 100px;
  margin-left: 20px;
  overflow: hidden; /* 자식 요소가 부모 영역을 넘지 않도록 */
}
.book-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지 */
  transition: filter 0.5s ease; /* 부드러운 효과를 위한 transition */
}

/* 첫 번째 책 스타일 */
.book1 {
  width: 200px; 
  height: 300px;
  transform: rotate(-0deg); /* 살짝 회전 */
  animation: fadeInUp 1s ease-in-out 0.5s forwards;
}

/* 두 번째 책 스타일 */
.book2 {
  width: 200px; 
  height: 300px;
  transform: rotate(-0deg); /* 살짝 회전 */
  animation: fadeInUp 1.5s ease-in-out 0.5s forwards;
}

/* 세 번째 책 스타일 */
.book3 {
  width: 200px;
  height: 300px;
  transform: rotate(+0deg); /* 살짝 회전 */
  animation: fadeInUp 2s ease-in-out 0.5s forwards;
}

/* 네 번째 책 스타일 */
.book4 {
  width: 200px;
  height: 300px;
  filter: grayscale(50%); /* 흑백 효과 */
  transform: rotate(+0deg); /* 살짝 회전 */
  animation: fadeInUp 2.5s ease-in-out 0.5s forwards;
}
.book-info {
  position: absolute;
  bottom: 0; /* 아래쪽에 위치 */
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 배경 */
  color: white;
  text-align: center;
  padding: 10px;
  opacity: 0; /* 기본적으로 보이지 않음 */
  transform: translateY(20px); /* 아래에서 올라오는 효과 */
  transition: opacity 0.5s ease, transform 0.5s ease; /* 부드러운 효과 */
}
/* hover 시 효과 */
.book-item:hover img {
  filter: grayscale(100%); /* 흑백 효과 */
}

.book-item:hover .book-info {
  opacity: 1; /* 정보 보이기 */
  transform: translateY(0); /* 원래 위치로 */
}


  

  </style>
  