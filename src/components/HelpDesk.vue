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
              <li><a href="#" class="helpdesk" @click="goToHelpDesk">고객센터</a></li>
            </ul>
          </nav>
          <div class="profile">
            <a href="#"><img @click="goToMyPage" src="@/assets/profileicon.png" alt="Profile" /></a>
          </div>
        </div>
      </header>
      <main>
        <section class="faq-section">
          <h2>무엇을 도와드릴까요?</h2>
          <p class="subheading">자주 묻는 질문</p>
          <ul class="faq-list">
            <li v-for="(question, index) in faqQuestions" :key="index">
              <button class="faq-item" @click="openModal(question)">
                {{ question }}
              </button>
            </li>
          </ul>
          <button class="contact-button" @click="goToContact">1:1 문의 접수</button>
        </section>
      </main>
      <!-- 모달 창 -->
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h3>{{ selectedQuestion }}</h3>
          <div class="answer-box">
            <p>{{ selectedAnswer }}</p> <!-- 답변을 동적으로 표시 -->
          </div>
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        faqQuestions: [
          "다독이다 사이트란?",
          "회원가입은 어떻게 하나요?",
          "MBTI로 책을 추천받는 건 어떻게 하나요?",
          "게시물을 쓰려면 어떻게 해야할까요?",
          "이달의 책 선정 기준은 뭔가요?"
        ],
        faqAnswers: {
          "다독이다 사이트란?": "다독이다란, ",
          "회원가입은 어떻게 하나요?": "우측 상단에 있는 회원가입 버튼을 누르신 뒤 닉네임과 아이디, 비밀번호를 입력하시면 회원가입을 할 수 있습니다. ",
          "MBTI로 책을 추천받는 건 어떻게 하나요?": "메인 페이지의 우측 하단에서 MBTI위젯을 발견하실 수 있습니다. 클릭 후 자신의 MBTI에 맞는 책을 추천 받으시면 됩니다.",
          "게시물을 쓰려면 어떻게 해야할까요?": " 화면 상단 중앙 부분의 게시판 텍스트를 클릭하면 게시판 페이지로 이동하게 됩니다. 이동 후 글쓰기 버튼을 클릭하여 게시물을 작성하시면 됩니다.",
          "이달의 책 선정 기준은 뭔가요?": "이달의 책 선정 기준은 교보문고, 영풍문고, 알라딘의 인터넷 서점에서 그 달의 가장 인기있는 책을 가져와 선정하였습니다"
        },
        isModalOpen: false,
        selectedQuestion: "",
        selectedAnswer: "", // 선택한 질문의 답변을 저장
      };
    },
    methods: {
      openModal(question) {
        this.selectedQuestion = question;
        // faqAnswers 객체에서 해당 질문에 대한 답을 찾고, 없으면 "답변이 없습니다."를 기본값으로 설정
        this.selectedAnswer = this.faqAnswers[question] || "답변이 없습니다."; 
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      goToContact() {
        this.$router.push({ name: "Contact" });
      },
      goToJoin() {
        this.$router.push({ name: "JoinPage" });
      },
      goToMain() {
        this.$router.push({ name: "MainPage" });
      },
      goToLogin() {
        this.$router.push({ name: "LoginPage" });
      },
      goToBoard() {
        this.$router.push({ name: "PostListView" });
      },
      goToMonthBook() {
        this.$router.push({ name: "BookPage11" });
      },
      goToMyPage() {
        this.$router.push({ name: "myPage" });
      },
      goToHelpDesk() {
      this.$router.push({ name: "HelpDesk" });
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
    /* FAQ 섹션 */
    .faq-section {
  padding-right: 30px;
  padding-left: 30px;
  background-color: white;
  margin: 20px auto; /* 중앙 정렬 */
  width: 35%;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #b0b0b0; /* 핑크색 테두리 */
}

.faq-section h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.faq-section .subheading {
  font-size: 16px;
  color: #777;
  text-align: center;
  margin-bottom: 0px;
}

.faq-list {
  list-style: none;
  padding: 0;
}


/* FAQ 항목을 동그라미 형태로 만들기 */
.faq-item {
  background-color: white; /* 흰색 배경 */
  border: 2px solid #f4c4b7; /* 핑크색 테두리 */
  text-align: center;
  color: black;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  border-radius: 30px; /* 동그라미 형태 */
  display: inline-block;
  box-sizing: border-box;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.faq-item:hover {
  background-color: #f4c4b7;
  text-decoration: none;
}



.contact-button {
  display: block;
  margin: 20px auto;
  background-color: #f4c4b7;
  padding: 10px 30px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #e0a99f;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.answer-box {
  padding: 15px;
  background-color: #f4f4f4;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 16px;
}

.modal-content button {
  background-color: #f4c4b7;
  padding: 10px 30px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #e0a99f;
}
  
  
    
  
    </style>
    