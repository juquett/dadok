<template>
  <div id="write-post">
    <header>
      <h1>게시물 작성</h1>
    </header>

    <main>
      <div class="upload-form">
        <input type="text" v-model="newPost.title" placeholder="제목" />
        <input type="file" @change="onFileChange" accept="image/*" />
        <button @click="uploadPost">업로드</button>
        <button @click="cancelUpload">취소</button>
      </div>

      <!-- 업로드한 게시물 미리보기 -->
      <div v-if="newPost.image" class="preview">
        <h3>미리보기</h3>
        <h4>{{ newPost.title }}</h4>
        <img :src="newPost.image" alt="Uploaded Image" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        title: '',
        image: ''
      }
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newPost.image = e.target.result; // 업로드한 이미지 URL 저장
        };
        reader.readAsDataURL(file);
      }
    },
    uploadPost() {
      if (this.newPost.title && this.newPost.image) {
        // 게시물을 저장하는 로직 추가 (예: API 호출)
        console.log("게시물 업로드:", this.newPost);
        // 폼 초기화
        this.newPost.title = '';
        this.newPost.image = '';
      } else {
        alert("제목과 이미지를 입력해 주세요."); // 경고 메시지
      }
    },
    cancelUpload() {
      this.newPost.title = '';
      this.newPost.image = '';
      this.$router.push({ name: 'BoardPage' }); // 게시판 페이지로 돌아가기
    }
  }
};
</script>

<style scoped>
/* 스타일 추가 */
#write-post {
  padding: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

.upload-form input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.upload-form button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f4c4b7;
  color: white;
  cursor: pointer;
}

.upload-form button:hover {
  background-color: #e3a999;
}

.preview {
  margin-top: 20px;
  text-align: center;
}

.preview img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
