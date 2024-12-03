<template>
  <div class="post-detail">
    <header>
      <div class="logo" @click="goToMain">
        <img src="@/assets/Group (1).png" alt="Logo" />
        <h1>DADOK</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#" @click="goToBoard">게시판</a></li>
          <li><a href="#" @click="goToMonthBook">이달의책</a></li>
          <li><a href="#">고객센터</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <div v-if="post" class="post-container">
        <h2>{{ post.title }}</h2>
        <div v-if="post.tags" class="tags">
          <span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag }}</span>
        </div>
        <img :src="'http://localhost:3000' + post.image" alt="게시물 이미지" class="post-image" />
        <p>{{ post.content }}</p>

        <div class="actions">
          <button @click="toggleLike">
            <img :src="isLiked ? require('@/assets/HeartFilled.png') : require('@/assets/Heart.png')" />
            <span>{{ likesCount }}</span>
          </button>
          <button @click="scrollToComments">댓글</button>
        </div>
      </div>
      <div v-else>
        <p>게시물이 없습니다.</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: null,
      isLiked: false,
      likesCount: 0,
      commentsCount: 0
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`);
      this.post = response.data;
      this.likesCount = this.post.likes || 0;
      this.commentsCount = this.post.comments.length || 0;
    } catch (error) {
      console.error("게시물 데이터를 가져오는 데 실패했습니다.", error);
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likesCount += this.isLiked ? 1 : -1;
    },
    scrollToComments() {
      const commentsSection = document.querySelector('.comments');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    goToBoard() {
      this.$router.push({ name: 'PostListView' });
    },
    goToMonthBook() {
      this.$router.push({ name: 'MonthBookPage' });
    },
    goToMain() {
      this.$router.push({ name: 'MainPage' });
    }
  }
};
</script>

<style scoped>
.post-container {
  margin: 20px;
}

.post-image {
  width: 100%;
  height: auto;
}

.actions button {
  margin-top: 10px;
}
</style>
