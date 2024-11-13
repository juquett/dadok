<template>
  <div class="write-post">
    <main>
      <div class="main-container">
        <div class="upload-form">
          <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none;" />
          <div class="image-upload" @click="triggerFileInput">
            <img :src="image || defaultImage" alt="Upload" />
          </div>
          <div class="title-tag-container">
            <input v-model="title" id="title" placeholder="제목을 입력하세요." />
            <div class="tag-dropdown">
              <select v-model="selectedTag" @change="addTag">
                <option disabled value="">태그 선택</option>
                <option v-for="option in tagOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
              <div class="selected-tags">
                <span v-for="(tag, index) in tags" :key="index" class="tag">
                  {{ tag }}
                  <button @click="removeTag(tag)">X</button>
                </span>
              </div>
            </div>
          </div>
          <textarea v-model="content" id="content" placeholder="내용을 입력하세요." class="content-box"></textarea>
        </div>
      </div>
    
      <!-- 등록 버튼 -->
      <div class="upload-container">
        <button class="uploadbtn" @click="submitPost">업로드</button>
        <button class="cancelbtn" @click="cancelUpload">취소</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      tags: [],
      content: '',
      image: null,
      tagOptions: ["소설", "경제/경영", "시/에세이", "웹소설", "자기계발", "취미", "인문"],
      selectedTag: "",
      defaultImage: require('@/assets/ImageUpload.png'),
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addTag() {
      if (this.selectedTag && !this.tags.includes(this.selectedTag)) {
        this.tags.push(this.selectedTag);
      }
      this.selectedTag = "";
    },
    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag);
    },
    submitPost() {
      if (this.title && this.content) {
        const newPost = {
          id: Date.now().toString(),
          title: this.title,
          content: this.content,
          image: this.image,
          tags: this.tags,
        };
        this.$store.commit('addPost', newPost); // Vuex에 전체 게시물 정보 추가
        this.$router.push('/post'); // 게시물 목록 페이지로 이동
      } else {
        alert('제목과 내용을 모두 입력하세요.');
      }
    },
    cancelUpload() {
      this.title = '';
      this.tags = [];
      this.content = '';
      this.image = null;
      this.$router.push({ name: 'PostListView' });
    }
  }
};
</script>


<style scoped>
/* 메인 컨테이너 스타일 */
.main-container {
  border: 2px solid #eaeaea;
  border-radius: 10px;
  padding: 20px;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-form input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.upload-container {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center;    /* 수직 중앙 정렬 */
  height: 10vh;          /* 화면 전체 높이 사용 */
}
.uploadbtn, .cancelbtn {
  width: 6%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #f4c4b7;
  color: white;
  cursor: pointer;
  margin: 1%;
}

.uploadbtn:hover, .cancelbtn:hover {
  background-color: #e3a999;
}

/* 이미지 업로드 스타일 */
.image-upload {
  width: 100px;
  height: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 5%;
  margin-top: 4%;
}

.image-upload img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.title-tag-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 드롭다운 스타일 */
.tag-dropdown {
  
  display: flex;
  flex-direction: column;
  gap: 5px;
}

select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* 선택된 태그 스타일 */
.selected-tags {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.selected-tags .tag {
  display: inline-block;
  background-color: #f4c4b7;
  color: white;
  padding: 5px;
  margin-right: 5px;
  border-radius: 5px;
}

.selected-tags .tag button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
}

/* 글쓰기 내용 박스 */
.content-box {
  width: 97%;
  height: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
}
</style>
