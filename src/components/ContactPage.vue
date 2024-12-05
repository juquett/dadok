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
        <div class="chat-wrapper">
          <div class="chat-container">
            <div class="chat-header">
              <h2>1:1 문의하기</h2>
              <button class="back-button" @click="goBack">뒤로가기</button>
            </div>
  
            <div class="messages">
              <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
                {{ message.text }}
              </div>
            </div>
  
            <!-- 입력 영역 -->
            <div class="input-container">
              <input
                v-model="userInput"
                @input="onInput"
                @keyup.enter="sendMessage"
                placeholder="메시지를 입력하세요"
              />
              <button @click="sendMessage">전송</button>
  
              <!-- 자동완성 목록 -->
              <ul v-if="showSuggestions && suggestions.length" class="suggestions">
                <li
                  v-for="(suggestion, index) in suggestions"
                  :key="index"
                  @click="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </li>
              </ul>
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
        messages: [],
        userInput: "",
        showSuggestions: false,
        suggestions: [],
        predefinedResponses: {
          "안녕하세요": "안녕하세요! 무엇을 도와드릴까요?",
          "운영 시간은?": "운영 시간은 오전 9시부터 오후 6시까지입니다.",
          "게시판을 작성하고 싶어요": "게시판 작성 방법은 여기에 있습니다.",
          "게시판을 삭제하고 싶어요": "게시판 작성 방법은 여기에 있습니다.",
          "게시판을 수정하고 싶어요": "게시판 작성 방법은 여기에 있습니다.",
          "도움이 필요해요": "어떤 도움이 필요하신지 말씀해주세요.",
          "프로필사진을 변경하고 싶어요": "데이터를 입력해주세요.",
          "닉네임을 변경하고 싶어요": "마이페이지에서 닉네임 변경 버튼으로 변경할 수 있습니다.",
          "다독이다는 무슨 사이트야?": "책에 대해 리뷰하고 토론하며 독서 경험을 공유할 수 있는 곳입니다!",
          "메인 페이지": "메인페이지로 이동하기",
        },
        availableKeywords: [
            "게시판을 작성하고 싶어요", "운영 시간은?", "다독이다는 무슨 사이트야?", "안녕하세요", "게시판을 삭제하고 싶어요","게시판을 수정하고 싶어요"
            ,"프로필사진을 변경하고 싶어요","닉네임을 변경하고 싶어요","메인 페이지"
        ], // 자동완성 키워드
      };
    },
    computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
    methods: {
      sendMessage() {
        if (this.userInput.trim() === "") return;
  
        this.messages.push({ text: this.userInput, sender: "user" });
  
        const response =
          this.predefinedResponses[this.userInput.trim()] ||
          "죄송하지만 이해하지 못했어요.";
        setTimeout(() => {
          this.messages.push({ text: response, sender: "bot" });
          this.scrollToBottom();
        }, 500);
  
        this.userInput = "";
        this.scrollToBottom();
      },
      onInput() {
        this.suggestions = [];
        this.showSuggestions = false;
  
        if (this.userInput.trim().length > 0) {
          // 사용자가 입력한 텍스트와 일치하는 자동완성 항목 찾기
          this.suggestions = this.availableKeywords.filter((keyword) =>
            keyword.toLowerCase().includes(this.userInput.trim().toLowerCase())
          );
          if (this.suggestions.length > 0) {
            this.showSuggestions = true;
          }
        }
      },
      selectSuggestion(suggestion) {
        this.userInput = suggestion; // 자동완성 항목 선택 시 입력 필드에 반영
        this.showSuggestions = false; // 목록 숨기기
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const messagesContainer = this.$el.querySelector(".messages");
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
      },
    
      goBack() {
        this.$router.go(-1); // 이전 페이지로 이동
      },
      goToContact() {
        this.$router.push({ name: "ContactPage" });
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
    .chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-family: 'MyCustomFont';    
  background-color: #4a4a4a;
  color: white;
  border-radius: 0px; /* 헤더와 박스가 붙도록 radius 제거 */
  margin: 0; /* 마진 제거 */
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
}

.back-button {
  font-family: 'MyCustomFont';
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
}
.chat-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 160px);
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 50%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background: white;
  padding: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}

.message {
  
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.user {
  align-self: flex-end;
  background-color: #f4c4b7;
  color: white;
  text-align: left;
}

.message.bot {
  align-self: flex-start;
  background-color: #f1f0f0;
  color: black;
  text-align: left;
}

/* 스크롤바 숨기기 (선택사항) */
.messages::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

/* 입력 영역 */
.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #eaeaea;
  position: relative; /* 상대 위치 설정 */
}

input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #eaeaea;
  border-radius: 20px;
}

button {
  padding: 10px 15px;
  background-color: #f4c4b7;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.suggestions {
  position: absolute;
  top: 50px; /* input 필드 바로 아래에 표시되도록 수정 */
  left: 0;
  background-color: white;
  border: 1px solid #eaeaea;
  width: 88%; /* 입력 필드와 동일한 너비 */
  list-style: none;
  padding: 0px 0;
  margin: 0;
  max-height: 100px;
  margin-left: 10px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 10; /* 입력 필드 위에 표시되도록 설정 */
}

.suggestions li {
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent; /* 기본 배경색을 투명으로 설정 */
}

.suggestions li:hover {
  background-color: #f4c4b7; /* hover 시 배경색 변경 */
  color: white; /* hover 시 텍스트 색상 변경 */
  padding: 5px 10px;
}

    </style>