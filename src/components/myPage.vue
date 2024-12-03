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
      <div class="mypage-container">
        <div class="profile-section">
          <!-- 프로필 사진 및 사진 변경 버튼 -->
          <div class="profile-image-section">
  <label for="profileImageUpload" class="profile-image-label">
    <img
      :src="profileImage"
      alt="Profile Image"
      class="profile-image"
    />
  </label>
  <input
    id="profileImageUpload"
    type="file"
    accept="image/*"
    @change="changeProfileImage"
    class="hidden-input"
  />
</div>


          <!-- 사용자 정보 (닉네임, 아이디) -->
          <div class="user-info-section">
            <h2 v-if="username">{{ username }}</h2>
            <p class="user-info" v-if="userId">아이디: {{ userId }}</p>
          </div>

          <!-- 버튼 섹션 (닉네임 변경, 회원 탈퇴) -->
          <div class="button-group">
            <button class="button1" @click="editNickname">닉네임 변경</button>
            <button class="button2" @click="showDeleteModal">회원 탈퇴</button>
          </div>
        </div>
      </div>

      <div id="app">
        </div>
  <div class="mypage-container">
    <!-- 기존의 프로필 섹션 코드 -->
    
    <!-- 게시판/ 좋아요 왔다갔다 하는 탭-->
    <div class="tab-buttons">
          <button :class="{ active: activeTab === 'recommendations' }" @click="selectTab('recommendations')">내 게시물</button>
          <button :class="{ active: activeTab === 'like' }" @click="selectTab('like')">좋아요</button>

        </div>

    <!-- 선택된 탭에 따라 표시되는 콘텐츠 섹션 -->
    <div v-if="activeTab === 'like'" class="like-tab">
          <!-- '좋아요' 콘텐츠가 여기에 표시됩니다 -->
        </div>
        <div v-if="activeTab === 'recommendations'" class="recommendations-tab">
          <!-- 책 추천 콘텐츠 -->
          <div class="scroll-animation">
            <div class="book-item book1">
              <img src="@/assets/book5.jpg" alt="book image" />
              <div class="book-info">완전한 행복<br>정유정</div>
            </div>
            <div class="book-item book2">
              <img src="@/assets/book7.jpg" alt="book image" />
              <div class="book-info">채식주의자<br>한강</div>
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
export default {
  data() {
    return {
      profileImage: require('@/assets/ProfilePicture.png'), // 기본 프로필 이미지
      username: "홍길동",
      userId: "hong", // 사용자 아이디
      isNicknameModalVisible: false, // 모달 표시 여부
      newNickname: "", // 새 닉네임 저장 변수
      isDeleteModalVisible: false, // 모달 창 표시 여부
      activeTab: 'like' // 탭
    };
    
  },
  created() {
  this.loadProfileFromLocalStorage(); // LocalStorage에서 데이터 불러오기
},


  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {

    fetchUserData() {
      this.$axios.get('/mypage', {withCredentials: true})
        .then(response => {
          // 백엔드 응답에서 userId와 nickname 데이터를 가져옵니다.
          this.userId = response.data.userId;
          this.username = response.data.nickname;
        })
        .catch(error => {
          console.log(this.userId);
          console.error("사용자 데이터를 가져오지 못했습니다:", error);
        });
    },

    logout() {
    this.$store.commit('logout'); // Vuex 상태 갱신
    this.$router.push('/'); // 로그인 페이지로 리디렉션
  },
    selectTab(tab) {
      this.activeTab = tab;
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
      this.$router.push({ name: "BookPage11" });
    },
    goToMyPage() {
      this.$router.push({ name: "myPage" });
    },
    goToBoard() {
      // BoardPage로 라우팅
      this.$router.push({ name: "PostListView" });
    },
    goToHelpDesk() {
      this.$router.push({ name: "HelpDesk" });
    },
    changeProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = URL.createObjectURL(file); // 이미지 미리보기
      this.saveProfileToLocalStorage(); // 변경사항 저장
    }
  },
    editNickname() {
    this.isNicknameModalVisible = true; // 모달 표시
  },
  saveProfileToLocalStorage() {
    const profileData = {
      username: this.username,
      profileImage: this.profileImage,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
  },

  // 페이지 로드 시 프로필 데이터 불러오기
  loadProfileFromLocalStorage() {
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    if (profileData) {
      this.username = profileData.username || this.username;
      this.profileImage = profileData.profileImage || this.profileImage;
    }
  },
  confirmNicknameChange() {
    if (this.newNickname.trim()) {
      this.username = this.newNickname; // username 업데이트
      this.newNickname = ""; // 입력란 초기화
      this.isNicknameModalVisible = false; // 모달 닫기
      this.saveProfileToLocalStorage(); // 변경사항 저장
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
      this.$store.commit('logout'); // Vuex 상태 갱신
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
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* 가로 너비를 꽉 채우는 탭 버튼 */
.tab-buttons {
  display: flex;
  width: 97%;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-buttons button {
  flex: 1;
  padding: 15px;
  background-color: #f4c4b7;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* 활성화된 버튼 색상 */
.tab-buttons button.active {
  background-color: #e39c87;
}

/* 버튼 호버 시 색상 변경 */
.tab-buttons button:hover {
  background-color: #d3957d;
}
/* 탭 콘텐츠 섹션 */
.like-tab, .recommendations-tab {
  width: 100%;
}
.hidden-input {
  display: none; /* 파일 선택 버튼 숨기기 */
}
.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-left: 30px;
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
  background-color: #f4c4b7; /* 회색 */
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #e39c87; /* hover 시 더 어두운 회색 */
}

.cancel-button {
  background-color: #C0C0C0;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #A9A9A9;
}

.center-text, .center-text2 {
  text-align: center;
  margin: 10px 0;
}

/* 책 추천 섹션 */
.scroll-animation {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 100%;
}

.book-item {
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.book-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  padding: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s, transform 0.5s;
}

.book-item:hover img {
  filter: grayscale(100%);
}

.book-item:hover .book-info {
  opacity: 1;
  transform: translateY(0);
}

</style>
