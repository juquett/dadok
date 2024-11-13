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
            <li><a href="#">고객센터</a></li>
          </ul>
        </nav>
        <div class="profile">
          <a href="#"><img @click="goToMyPage" src="@/assets/profileicon.png" alt="Profile" /></a>
        </div>
      </div>
    </header>

    <main>
      <div class="mypage-container">
        <div class="profile-section">
          <!-- 프로필 사진 및 사진 변경 버튼 -->
          <div class="profile-image-section">
            <img :src="profileImage" alt="Profile" class="profile-image" />
            <input type="file" @change="changeProfileImage" class="upload-button" />
          </div>

          <!-- 사용자 정보 (닉네임, 아이디) -->
          <div class="user-info-section">
            <div v-if="user && user.name">
            {{ user.name }}
            </div>
            
          </div>

          <!-- 버튼 섹션 (닉네임 변경, 회원 탈퇴) -->
          <div class="button-group">
            <button class="button1" @click="editNickname">닉네임 변경</button>
            <button class="button2" @click="showDeleteModal">회원 탈퇴</button>
          </div>
        </div>
      </div>
<!-- 닉네임 변경 모달 -->
<div v-if="isNicknameModalVisible" class="modal-overlay">
  <div class="modal">
    <h2>닉네임 변경</h2>
    <p>새 닉네임을 입력하세요:</p>
    <input v-model="newNickname" type="text" placeholder="새 닉네임" class="nickname-input" />
    <div class="modal-buttons">
      <button class="confirm-button" @click="confirmNicknameChange">확인</button>
      <button class="cancel-button" @click="closeNicknameModal">취소</button>
    </div>
  </div>
</div>
<!-- 회원 탈퇴 모달 -->
<div v-if="isDeleteModalVisible" class="modal-overlay">
  <div class="modal">
    <!-- 큰 글씨, 굵은 텍스트. "회원 탈퇴"만 빨간색 -->
    <p class="modal-title" style="font-size: 20px;">
      정말로 <span class="highlight-warning">회원 탈퇴</span>하시겠습니까?
    </p>

    <!-- 작은 글씨 텍스트 -->
    <p class="modal-subtext" style="font-size: 10px;">다시는 되돌릴 수 없습니다. 그래도 회원 탈퇴를 하시겠습니까?</p>

    <!-- 버튼들 -->
    <button @click="confirmDelete" class="confirm-button">확인</button>
    <button @click="cancelDelete" class="cancel-button">취소</button>
  </div>
</div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      profileImage: "@/assets/default-profile.png", // 기본 프로필 이미지
      user: {},
      username: "",
      userId: null, // 사용자 아이디
      isNicknameModalVisible: false, // 모달 표시 여부
      newNickname: "", // 새 닉네임 저장 변수
      isDeleteModalVisible: false, // 모달 창 표시 여부
    };
  },
  created() {
  const token = localStorage.getItem('token');
  console.log('저장된 토큰:', token); // 토큰 확인
  if (!token) {
    console.error('토큰이 없습니다. 로그인 페이지로 리디렉션합니다.');
    this.$router.push('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    return;
  }

  axios
  .get(`http://172.16.111.42:8080/mypage`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // 토큰 포함
  })

    .then((response) => {
      this.user = response.data;
      console.log('받은 유저 정보:', this.user);
    })
    .catch((error) => {
      console.error('유저 정보를 불러오는 중 에러 발생:', error);
    });
},

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token'); // 로컬 스토리지에서 JWT 삭제
      this.$store.commit('logout'); // Vuex 상태 갱신
      this.$router.push('/'); // 로그인 페이지로 리디렉션
    },
    goToMain() {
      this.$router.push({ name: "MainPage" });
    },
    goToJoin() {
      this.$router.push({ name: "JoinPage" });
    },
    goToLogin() {
      this.$router.push({ name: "LoginPage" });
    },
    goToMonthBook() {
      this.$router.push({ name: "BookPage10" });
    },
    goToMyPage() {
      this.$router.push({ name: "myPage" });
    },
    goToBoard() {
      // BoardPage로 라우팅
      this.$router.push({ name: "PostListView" });
    },
    changeProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file); // 이미지 미리보기
      }
    },
    editNickname() {
      this.isNicknameModalVisible = true; // 모달 표시
    },
    confirmNicknameChange() {
      if (this.newNickname.trim()) {
        this.nickname = this.newNickname; // 닉네임 업데이트
        this.newNickname = ""; // 입력란 초기화
        this.isNicknameModalVisible = false; // 모달 닫기
      } else {
        alert("닉네임을 입력해주세요.");
      }
    },
    closeNicknameModal() {
      this.newNickname = ""; // 입력란 초기화
      this.isNicknameModalVisible = false; // 모달 닫기
    },
    deleteAccount() {
      if (confirm("정말로 회원 탈퇴하시겠습니까?")) {
        // 회원 탈퇴 로직
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push({ name: "MainPage" });
      }
    },
    showDeleteModal() {
      this.isDeleteModalVisible = true;
    },
    confirmDelete() {
      // 회원 탈퇴 로직
      alert("회원 탈퇴가 완료되었습니다.");
      this.isDeleteModalVisible = false;
      this.$router.push({ name: "MainPage" });
    },
    cancelDelete() {
      this.isDeleteModalVisible = false;
    }
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

/* Main Styles */
.mypage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
  background-color: #f5f5f5;
  padding: 0 50px;
}

.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  background-color: #FFF9F8;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0px 8px 9px rgba(0, 0, 0, 0.2);
}

.profile-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  box-shadow: 0px 8px 9px rgba(0, 0, 0, 0.2);
}

.upload-button {
  margin-top: 10px;
}

.user-info-section {
  flex-grow: 1;
  padding-left: 50px;
}

h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.user-info {
  font-size: 16px;
  color: #555;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 100px;
}

.button1 {
  background-color: #f4c4b7;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 50px;
  cursor: pointer;
}

.button2 {
  background-color: #C0C0C0;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 50px;
  cursor: pointer;
}

button:hover {
  background-color: #e39c87;
}
/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 큰 글씨, 굵은 텍스트 */
.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 빨간색으로 강조된 텍스트 */
.highlight-warning {
  color: red;
}

/* 작은 글씨 텍스트 */
.modal-subtext {
  font-size: 12px;
  color: #555;
  margin-bottom: 20px;
}

/* 모달 박스 */
.modal {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
}

.modal h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.modal p {
  font-size: 16px;
  margin-bottom: 20px;
}

.nickname-input {
  width: calc(100% - 20px); /* 패딩을 고려한 너비 설정 */
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 너비 계산 */
}

/* 모달 버튼 스타일 */
.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.confirm-button {
  background-color: #C0C0C0; /* 회색 */
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #A9A9A9; /* hover 시 더 어두운 회색 */
}

.cancel-button {
  background-color: #f4c4b7;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #e39c87;
}
</style>
