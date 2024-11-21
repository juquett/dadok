<template>
    <div class="post-create">
      <h1>게시물 작성</h1>
      <form @submit.prevent="createPost" class="post-form">
        <!-- 제목 입력 -->
        <div class="form-group">
          <label for="title">제목</label>
          <input type="text" id="title" v-model="postData.title" required placeholder="제목을 입력하세요." />
        </div>
  
        <!-- 태그 입력 -->
        <div class="form-group">
          <label for="tag">태그</label>
          <select v-model="selectedTag" @change="addTag">
            <option value="" disabled>태그 선택</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
          <div class="tags-list">
            <span v-for="(tag, index) in postData.tags" :key="index" class="tag">
              {{ tag }} <button @click="removeTag(tag)">X</button>
            </span>
          </div>
        </div>
  
        <!-- 내용 입력 -->
        <div class="form-group">
          <label for="content">내용</label>
          <textarea id="content" v-model="postData.content" required placeholder="내용을 입력하세요."></textarea>
        </div>
  
        <!-- 게시물 제출 버튼 -->
        <button type="submit" class="submit-btn">게시물 작성</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postData: {
          title: '',
          tags: [],
          content: ''
        },
        selectedTag: '',
        availableTags: ['소설', '경제/경영', '시/에세이', '웹소설', '자기계발', '취미', '인문']
      };
    },
    methods: {
      // 태그 추가
      addTag() {
        if (this.selectedTag && !this.postData.tags.includes(this.selectedTag)) {
          this.postData.tags.push(this.selectedTag);
        }
        this.selectedTag = '';
      },
      // 태그 삭제
      removeTag(tag) {
        this.postData.tags = this.postData.tags.filter(t => t !== tag);
      },
      // 게시물 생성
      async createPost() {
        if (!this.postData.title || !this.postData.content) {
          alert('제목과 내용을 모두 입력하세요.');
          return;
        }
  
        const post = {
          memberId: 1234, // 로그인된 사용자 ID 가져오기
          title: "test",
          tag: "test",  // 태그들을 콤마로 구분
          content: "test"
        };
  
        try {
          const response = await this.$axios.post('http://172.16.104.25:8080/api/post/create', post);
          console.log('Post created:', response.data);
          alert('게시물이 작성되었습니다.');
          this.$router.push('/post-list'); // 게시물 목록 페이지로 리디렉션
        } catch (error) {
          console.error('Failed to create post:', error);
          alert('게시물 작성에 실패했습니다.');
        }
      },
      // 로그인된 사용자 ID 가져오기
      getMemberId() {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          // 로그인되지 않은 경우, 적절한 처리 (예: 로그인 페이지로 리디렉션)
          alert('로그인 정보가 없습니다.');
          this.$router.push('/login'); // 로그인 페이지로 이동
          return null;
        }
        return parseInt(memberId); // 문자열을 숫자로 변환하여 반환
      }
    }
  };
  </script>
  
  <style scoped>
  .post-create {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .post-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  
  input, select, textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  textarea {
    height: 150px;
    resize: none;
  }
  
  .tags-list {
    margin-top: 10px;
  }
  
  .tag {
    display: inline-block;
    background-color: #f4c4b7;
    color: white;
    padding: 5px;
    margin-right: 10px;
    border-radius: 5px;
  }
  
  .tag button {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  .submit-btn {
    background-color: #f4c4b7;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .submit-btn:hover {
    background-color: #e3a999;
  }
  </style>
  