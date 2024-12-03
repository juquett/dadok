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
          <li><a href="#">고객센터</a></li>
        </ul>
      </nav>
      <div class="profile">
        <a href="#"><img @click="goToMyPage" src="@/assets/profileicon.png" alt="Profile" /></a>
      </div>
    </div>
  </header>

  <div class="write-post">
    <main>
      <div v-if="isLoading" class="main-container"> <!-- 로딩 상태 표시 -->
        <p>Loading...</p>
      </div>

      <div v-else-if="post" class="main-container"> <!-- 데이터가 로드된 후 게시물 표시 -->
        <div v-if="post">
          <div class="delete-button">
            <img src="@/assets/DeleteIcon.png" alt="Delete Post" class="action-icon" @click="deletePost" />
          </div>
          <div class="back-button">
            <img src="@/assets/BackIcon.png" alt="Back" @click="goToBoard" />
          </div>
          <h2>{{ post.title }}</h2>
          <div v-if="post.tags && post.tags.length" class="tags">
            <span v-for="(tag, index) in post.tags" :key="index" class="tag">
              {{ tag }}
            </span>
          </div>
          <hr class="custom-line">
          <div class="image-form">
            <img :src="'http://172.16.111.168:3000' + post.image" alt="게시물 이미지" class="post-image" />
          </div>
          <hr class="custom-line">
          <p class="post-content">{{ post.content }}</p>

          <div class="post-actions">
            <div class="like-section">
              <img 
                :src="isLiked ? require('@/assets/HeartFilled.png') : require('@/assets/Heart.png')"   
                alt="Like" 
                class="action-icon" 
                @click="toggleLike"
              />
              <span>{{ likesCount }}</span>
            </div>
            <div class="comment-section">
              <img 
                src="@/assets/Comment.png" 
                alt="Comment" 
                class="action-icon" 
                @click="scrollToComments"
              />
              <span>{{ commentsCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      post: null,
      isLoading: true,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
    };
  },
  created() {
    console.log('컴포넌트가 생성되었습니다.');
    this.fetchPostData();
  },
  methods: {
    async fetchPostData() {
      try {
        console.log('게시물 데이터 요청 중...');
        const response = await axios.get(`/api/posts/${this.id}`);
        this.post = response.data;
        
        // tags가 JSON 형식의 문자열인 경우 파싱
        if (this.post.tags && typeof this.post.tags[0] === 'string') {
          this.post.tags = JSON.parse(this.post.tags[0]);
        }

        this.isLoading = false; // 로딩 완료
        console.log('서버에서 받은 데이터:', this.post);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 데 실패했습니다:", error);
        this.isLoading = false;
      }
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likesCount += this.isLiked ? 1 : -1;
    },
    scrollToComments() {
      const commentsSection = this.$el.querySelector('.comment-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    goToCreate() {
      this.$router.push({ name: 'PostCreateView' });
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('logout');
      this.$router.push('/');
    },
    goToMain() {
      this.$router.push({ name: 'MainPage' });
    },
    goToJoin() {
      this.$router.push({ name: 'JoinPage' });
    },
    goToLogin() {
      this.$router.push({ name: 'LoginPage' });
    },
    goToBoard() {
      this.$router.push({ name: "PostListView" });
    },
    goToMonthBook() {
      this.$router.push({ name: 'BookPage11' });
    },
    goToMyPage() {
      this.$router.push({ name: "myPage" });
    },
    async deletePost() {
      const confirmed = confirm("게시물을 삭제하시겠습니까?");
      if (confirmed) {
        try {
          await axios.delete(`/api/posts/${this.id}`);
          alert("게시물이 삭제되었습니다.");
          this.$router.push({ name: 'PostListView' });
        } catch (error) {
          alert("게시물 삭제에 실패했습니다.");
        }
      } else {
        alert("삭제가 취소되었습니다.");
      }
    },
  }
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

.post-image {
  width: 10%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 00px;
}
.tag {
  display: inline-block;
  background-color: #f4c4b7;
  color: white;
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
  padding-right: 15px;
  padding-left: 15px;
}
.main-container {
  position: relative; /* 버튼 위치를 조정하기 위해 추가 */
  border: 2px solid #eaeaea;
  border-radius: 30px;
  padding: 20px;
  max-width: 700px;
  height: 100%;
  margin: 20px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.custom-line {
  border: 1px solid #eaeaea;
}
.image-form {
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
}
.post-image {
  width: 20%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 00px;
}
.delete-button {
  position: absolute;
  top: 20px;
  right: 60px;
  cursor: pointer;
}
.delete-button img {
  width: 24px; /* 버튼 크기 조절 */
  height: auto;
}
.back-button {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.back-button img {
  width: 24px; /* 버튼 크기 조절 */
  height: auto;
}
.post-content {
  white-space: pre-line;
}
.post-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 80px;
  gap: 20px; /* 좋아요와 댓글 간격 */
  
}

.like-section, .comment-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.action-icon {
  width: 24px;
  height: auto;
  margin-right: 8px;
}

.post-actions span {
  font-size: 14px;
  color: #555;
}

</style>