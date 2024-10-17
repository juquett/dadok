<template>
    <div>
      <h1>게시글 목록</h1>
      <!-- 게시글 목록 폼 -->
       <hr>
       <button class="btn-Edit" type="button" @click="goToEdit">글쓰기</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostListView",
    methods: {
    goToEdit() {
      this.$router.push({ name: 'PostCreateView' });
    },
  },
  };
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>
  