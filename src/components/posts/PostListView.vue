<template>
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
    <section class="boardpage-form">
      <div class="form-board">
        <button class="btn" @click="goToBoard">게시판</button>
        <button class="btn2" @click="goToCreate">글쓰기</button>
      </div>
      <hr class="custom-line" />

      <!-- 게시물 목록 -->
      <div class="post-list">
        <div
          v-for="post in posts"
          :key="post._id"
          @click="openPostDetail(post)"
          class="post-item"
        >
          <img :src="getPostImageUrl(post.image)" alt="게시물 이미지" class="post-image" />
          <h3>{{ post.title.substring(0, 12) }}</h3>
          <p class="post-date">{{ formatDate(post.createdAt) }}</p> <!-- 날짜 추가 -->
        </div>
      </div>
    </section>

    <!-- 모달 -->
    <div v-if="selectedPost" class="modal-container">
      <PostDetailModal 
        :post="selectedPost" 
        @close="closeModal" 
        @post-deleted="handlePostDeleted" 
      />
    </div>
  </main>
</template>

<script>
import axios from "axios";
import PostDetailModal from "@/components/posts/PostDetailView.vue"; // 모달 컴포넌트 import

export default {
  data() {
    return {
      posts: [], // 게시물 데이터를 저장할 배열
      isAuthenticated: false, // 로그인 상태
      selectedPost: null, // 선택된 게시물 정보
    };
  },
  mounted() {
    this.checkAuthStatus(); // 로그인 상태 확인
    this.fetchPosts(); // 컴포넌트 로드 시 게시물 가져오기

    // 페이지 새로 고침 후 모달 상태 복원
    const savedPost = localStorage.getItem('selectedPost');
    if (savedPost) {
      this.selectedPost = JSON.parse(savedPost);
    }
  },

  methods: {
    // 게시물 목록 가져오기
    async fetchPosts() {
      try {
        const response = await axios.get("/api/posts"); // 서버로 GET 요청
        this.posts = response.data; // 응답 데이터를 posts 배열에 저장
      } catch (error) {
        console.error("게시물 가져오기 실패:", error);
      }
    },

    // 게시물 클릭 시 상세 모달 표시
    openPostDetail(post) {
      this.selectedPost = post;
      localStorage.setItem('selectedPost', JSON.stringify(post)); // 모달 상태 저장
    },

    // 모달 닫기
    closeModal() {
      this.selectedPost = null;
      localStorage.removeItem('selectedPost'); // 모달 상태 삭제
    },

    // 게시물 삭제 후 목록에서 해당 게시물 삭제
    handlePostDeleted(postId) {
      this.posts = this.posts.filter(post => post._id !== postId);
    },

    // 글쓰기 페이지로 이동
    goToCreate() {
      this.$router.push({ name: "PostCreateView" });
    },
    
    // 로그아웃 처리
    logout() {
      localStorage.removeItem("token"); // 로컬 스토리지에서 JWT 삭제
      this.$store.commit("logout"); // Vuex 상태 갱신
      this.isAuthenticated = false; // 로그인 상태 변경
      this.$router.push("/"); // 메인 페이지로 리디렉션
    },

    // 다른 페이지로 이동
    goToMain() {
      this.$router.push({ name: "MainPage" });
    },
    goToJoin() {
      this.$router.push({ name: "JoinPage" });
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

    // 로그인 상태 확인
    checkAuthStatus() {
      const token = localStorage.getItem("token");
      this.isAuthenticated = token ? true : false; // 로그인 상태 설정
    },
    
    // 게시물 이미지 경로 처리 함수
    getPostImageUrl(imagePath) {
      const baseUrl = "http://25.6.251.212:3000"; // 서버 주소
      return `${baseUrl}${imagePath}`;
    },

    // 날짜 형식 처리 함수 (예: 2024-12-04T15:23:42Z -> 2024-12-04)
    formatDate(dateString) {
      const date = new Date(dateString); // 문자열을 Date 객체로 변환
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return date.toLocaleString('ko-KR', options); // 한국 형식으로 날짜 및 시간 포맷팅
    }
  },
  components: {
    PostDetailModal, // 모달 컴포넌트 등록
  },
};
</script>





<style scoped>
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
  font-family: 'MyCustomFont', sans-serif;
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

}
.post-list {
  display: flex;
  flex-wrap: wrap; /* 한 줄에 여러 개씩 배치 */
  justify-content: start; /* 게시물이 줄의 중앙에 오도록 설정 */
  gap: 20px; /* 항목 간격을 설정 */
}

.post-item {
  flex: 1 0 30%; /* 각 게시물은 30% 너비를 차지 */
  box-sizing: border-box; /* 패딩 및 마진이 포함되도록 설정 */
  padding: 15px;
  margin-bottom: 20px; /* 아래쪽 여백 추가 */
  border-radius: 8px; /* 카드 모서리 둥글게 */
  background-color: #ededed; /* 배경 색상 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  cursor: pointer;
  transition: transform 0.2s ease-in-out; /* 클릭 시 확대 효과 */
  min-height: 200px; /* 일정 높이 설정 */
  max-width: 280px;
}
.post-item:hover {
  transform: translateY(-5px); /* 마우스 오버 시 살짝 위로 이동 */
}
.post-image {
  width: 120px; /* 이미지 크기 맞추기 */
  height: 170px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.post-item h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.post-item p {
  font-size: 14px;
  color: #666;
  overflow: hidden; /* 텍스트가 박스를 넘지 않도록 설정 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
  white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
}

/* 반응형 스타일 - 모바일 화면에서는 한 줄에 1개씩 표시 */
@media (max-width: 768px) {
  .post-item {
    flex: 1 0 100%; /* 모바일에서는 한 줄에 하나씩 */
  }
}
.post-date {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

</style>
