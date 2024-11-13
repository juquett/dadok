<!-- src/views/PostDetail.vue -->
<template>
  <div v-if="post">
    <img :src="post.image" alt="Post Image" class="post-image" />
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <div v-if="post.tags && post.tags.length" class="tags">
      <h3>선택한 태그:</h3>
      <span v-for="(tag, index) in post.tags" :key="index" class="tag">
        {{ tag }}
      </span>
    </div>
  </div>
  <div v-else>
    <p>게시물을 찾을 수 없습니다.</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      post: null,
    };
  },
  created() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  this.post = posts.find(post => post.id === this.id);
  
  if (!this.post) {
    console.error("게시물을 찾을 수 없습니다.");
  }
}

}

</script>

<style scoped>
.post-image {
  width: 10%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 00px;
}
</style>