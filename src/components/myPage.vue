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
            <li><a href="#">게시판</a></li>
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
      <div class="mypage-container">
        <div class="profile-section">
          <!-- 프로필 사진 및 사진 변경 버튼 -->
          <div class="profile-image-section">
            <img :src="profileImage" alt="Profile" class="profile-image" />
            <input type="file" @change="changeProfileImage" class="upload-button" />
          </div>

          <!-- 사용자 정보 (닉네임, 아이디) -->
          <div class="user-info-section">
            <h2>{{ nickname }}</h2>
            <p class="user-info">아이디: {{ userId }}</p>
          </div>

          <!-- 버튼 섹션 (닉네임 변경, 회원 탈퇴) -->
          <div class="button-group">
            <button @click="editNickname">닉네임 변경</button>
            <button @click="deleteAccount" color="#C0C0C0">회원 탈퇴</button>
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
      profileImage: "@/assets/default-profile.png", // 기본 프로필 이미지
      nickname: "사용자 닉네임",
      userId: "user123" // 사용자 아이디
    };
  },
  methods: {
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
      this.$router.push({ name: "MonthBookPage" });
    },
    goToMyPage() {
      this.$router.push({ name: "myPage" });
    },
    changeProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file); // 이미지 미리보기
      }
    },
    editNickname() {
      const newNickname = prompt("새 닉네임을 입력하세요", this.nickname);
      if (newNickname) {
        this.nickname = newNickname;
      }
    },
    deleteAccount() {
      if (confirm("정말로 회원 탈퇴하시겠습니까?")) {
        // 회원 탈퇴 로직
        alert("회원 탈퇴가 완료되었습니다.");
        this.$router.push({ name: "MainPage" });
      }
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

button {
  background-color: #f4c4b7;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 500px;
  cursor: pointer;
}

button:hover {
  background-color: #e39c87;
}
</style>
