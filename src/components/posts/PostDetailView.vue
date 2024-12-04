<template>
  <div v-if="selectedPost" class="modal-overlay">
    <div class="modal-content">
      <!-- 삭제 버튼 -->
      <button class="delete-btn" @click="showDeleteConfirmation">
        <img src="@/assets/DeleteIcon.png" alt="삭제" class="delete-icon" />
      </button>

      <!-- 모달 닫기 버튼 -->
      <button class="close-btn" @click="closeModal">&times;</button>

      <!-- 제목 수정 -->
      <h2 class="post-title">
        <input
          v-if="isEditing"
          v-model="selectedPost.title"
          class="input-title"
          placeholder="게시물 제목을 입력하세요"
        />
        <span v-else>{{ selectedPost.title }}</span>
      </h2>

      <!-- 프로필 이미지, 닉네임, 작성 시간 -->
      <div class="profile-container">
        <div class="nickname-container">
          <img
            :src="selectedPost.profileImage || require('@/assets/ProfilePicture.png')"
            alt="프로필 이미지"
            class="profile-image"
          />
          <div class="nickname-and-time">
            <span class="nickname">{{ selectedPost.nickname || '홍길동' }}</span>
            <span class="post-time">{{ formatDate(selectedPost.createdAt) }}</span>
          </div>
        </div>
        <div class="tags-container" v-if="selectedPost.tags && selectedPost.tags.length">
          <span class="tag">{{ selectedPost.tags.join(' ') }}</span>
        </div>
      </div>

      <hr class="custom-line" />

      <!-- 게시물 이미지 -->
      <div class="post-image-container">
        <img :src="'http://25.6.251.212:3000' + selectedPost.image" alt="게시물 이미지" class="post-image" />
      </div>

      <hr class="custom-line" />

      <!-- 게시물 내용 수정 -->
      <div v-if="isEditing">
        <textarea
          v-model="selectedPost.content"
          class="textarea-content"
          placeholder="게시물 내용을 입력하세요"
        ></textarea>
      </div>
      <p v-else class="post-content">{{ selectedPost.content }}</p>

      <!-- 수정 버튼 및 저장 버튼 -->
      <img
        v-if="!isEditing"
        src="@/assets/Edit.png"
        alt="수정"
        @click="startEditing"
        class="edit-icon"
      />
      <img
        v-if="isEditing"
        src="@/assets/Save.png"
        alt="저장"
        @click="saveChanges"
        class="edit-btn"
      />

      <!-- 좋아요 버튼 -->
      <div class="like-container">
        <img
          :src="isLiked ? require('@/assets/HeartFilled.png') : require('@/assets/Heart.png')"
          alt="좋아요"
          class="like-icon"
          @click="toggleLike"
        />
        <span>{{ likeCount }}</span>
      </div>

      <!-- 댓글 작성 -->
      <div class="comments-section">
        <h3>댓글</h3>

        <!-- 댓글 입력 -->
        <div class="comment-input">
          <!-- 프로필 이미지와 닉네임 -->
          <div class="profile-container">
            <img
              :src="selectedPost.profileImage || require('@/assets/ProfilePicture.png')"
              alt="프로필 이미지"
              class="comment-profile-image"
            />
            <span class="comment-nickname">{{ selectedPost.nickname || '홍길동' }}</span>
          </div>
          <textarea
            v-model="newComment"
            placeholder="댓글을 입력하세요"
            class="textarea-comment"
          ></textarea>
          <button @click="submitComment">댓글 작성</button>
        </div>

        <!-- 댓글 목록 -->
        <div v-if="comments.length > 0" class="comment-list">
          <div v-for="comment in comments" :key="comment._id" class="comment-item">
            <!-- 프로필 이미지와 닉네임 -->
            <div class="comment-header">
              <img
                :src="comment.profileImage || require('@/assets/ProfilePicture.png')"
                alt="프로필 이미지"
                class="comment-profile-image"
              />
              <span class="comment-nickname">{{ comment.nickname || '홍길동' }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
            <p class="comment-time">{{ formatDate(comment.createdAt) }}</p>
            <button class="delete-comment-btn" @click="deleteComment(comment._id)">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div v-if="isDeleteConfirmationVisible" class="delete-confirmation-overlay">
      <div class="delete-confirmation-modal">
        <p>게시물을 삭제하시겠습니까?</p>
        <button @click="confirmDelete">삭제</button>
        <button @click="cancelDelete">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDeleteConfirmationVisible: false, // 삭제 확인 모달 표시 여부
      isEditing: false, // 수정 모드 상태
      isLiked: false, // 좋아요 상태
      likeCount: this.post.likes || 0, // 좋아요 개수
      comments: [], // 댓글 목록
      newComment: "", // 새 댓글 텍스트
    };
  },
  computed: {
    selectedPost() {
      return this.post || {};
    },
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async toggleLike() {
      try {
        this.isLiked = !this.isLiked;
        this.likeCount += this.isLiked ? 1 : -1;

        const response = await axios.post(`/api/posts/${this.selectedPost._id}/like`, {
          liked: this.isLiked,
        });
        console.log(response.data.message); // 서버 응답 메시지 확인
      } catch (error) {
        console.error("좋아요 상태 업데이트 실패:", error);
        alert("좋아요 상태를 업데이트하는 중 오류가 발생했습니다.");
      }
    },
    closeModal() {
      this.$emit("close");
    },
    showDeleteConfirmation() {
      this.isDeleteConfirmationVisible = true;
    },
    async confirmDelete() {
      try {
        const postId = this.selectedPost._id;
        const response = await axios.delete(`/api/posts/${postId}`);
        alert(response.data.message);
        this.$emit("delete", this.selectedPost);
        this.goToBoard();
        this.isDeleteConfirmationVisible = false;
        this.closeModal();
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("게시물 삭제에 실패했습니다.");
      }
    },
    cancelDelete() {
      this.isDeleteConfirmationVisible = false;
    },
    startEditing() {
      this.isEditing = true;
    },
    async saveChanges() {
      try {
        const postId = this.selectedPost._id;
        const updatedPost = {
          title: this.selectedPost.title,
          content: this.selectedPost.content,
        };
        const response = await axios.put(`/api/posts/${postId}`, updatedPost);
        alert("게시물이 수정되었습니다.");
        this.$emit("update", response.data);
        this.isEditing = false;
      } catch (error) {
        console.error("게시물 수정 오류:", error);
        alert("게시물 수정에 실패했습니다.");
      }
    },
    async fetchComments() {
  try {
    const response = await axios.get(`/api/posts/${this.selectedPost._id}/comments`);
    // 최신 댓글이 위로 오게 배열을 정렬
    this.comments = response.data.comments.reverse();  
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    alert("댓글을 불러오는 중 오류가 발생했습니다.");
  }
},

async submitComment() {
  try {
    const response = await axios.post(`/api/posts/${this.selectedPost._id}/comments`, {
      comment: this.newComment,
    });
    // 댓글을 최신순으로 정렬하여 배열에 추가
    this.comments = response.data.comments.reverse();  
    this.newComment = ''; // 댓글 입력 초기화
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    alert("댓글 작성 중 오류가 발생했습니다.");
  }
},
async deleteComment(commentId) {
      try {
        // 서버에서 댓글 삭제 요청
        const response = await axios.delete(`/api/posts/${this.selectedPost._id}/comments/${commentId}`);
        alert(response.data.message); // 삭제 성공 메시지
        // 댓글 목록에서 해당 댓글을 삭제
        this.comments = this.comments.filter(comment => comment._id !== commentId);
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    goToBoard() {
      this.$router.push({ name: "PostListView" });
    },
  },
};
</script>





<style scoped>
/* 스타일 수정 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: auto;
}

.modal-content {
  width: 50%;
  max-height: 80%;  /* 최대 높이 설정 */
  background-color: white;
  padding: 20px;
  overflow-y: auto;  /* 세로 방향으로 스크롤 가능 */
  border-radius: 10px;
  position: relative;
}
/* 스크롤바 숨기기 */
.modal-content::-webkit-scrollbar {
  width: 0;  /* 세로 스크롤바 */
  height: 0;  /* 가로 스크롤바 */
}

/* 스크롤바 트랙도 숨김 */
.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

/* 스크롤바의 Thumb (드래그 바)도 숨김 */
.modal-content::-webkit-scrollbar-thumb {
  background: transparent;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 15px;
  color: #bbbbbb;
  background: none;
  border: none;
  padding: 0;
  font-size: 2em;
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-btn {
  position: absolute;
  top: 13px;
  right: 50px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 20px; /* 버튼의 크기 조정 */
  height: 20px; /* 버튼의 크기 조정 */
}

.delete-btn img {
  width: 100%; /* 이미지 크기를 버튼에 맞게 조정 */
  height: 100%; /* 이미지 크기를 버튼에 맞게 조정 */
  object-fit: contain; /* 이미지 비율을 유지하면서 버튼 크기에 맞추기 */
}
.delete-btn:hover {
  transform: scale(1.1); /* 호버 시 확대 */
}


.delete-confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.delete-confirmation-modal {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.delete-confirmation-modal button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 1em;
}

.delete-confirmation-modal button:hover {
  background-color: #f44336;
  color: white;
}
.edit-btn {
  position: absolute; /* 오른쪽 위에 고정 */
  top: 13px; /* 상단에서의 거리 */
  right: 85px; /* 오른쪽에서의 거리 */
  width: 20px; /* 이미지 크기 */
  height: 20px; /* 이미지 크기 */
  cursor: pointer; /* 마우스 포인터 변경 */
  transition: transform 0.2s ease; /* 호버 효과 */
}

.edit-btn:hover {
  transform: scale(1.1); /* 호버 시 확대 */
}
.edit-icon {
  position: absolute; /* 오른쪽 위에 고정 */
  top: 13px; /* 상단에서의 거리 */
  right: 85px; /* 오른쪽에서의 거리 */
  width: 20px; /* 이미지 크기 */
  height: 20px; /* 이미지 크기 */
  cursor: pointer; /* 마우스 포인터 변경 */
  transition: transform 0.2s ease; /* 호버 효과 */
}

.edit-icon:hover {
  transform: scale(1.1); /* 호버 시 확대 */
}

.post-image-container {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100%; /* 부모 요소의 높이를 꽉 채움 */
}
.profile-container {
  display: flex;
  justify-content: space-between; /* 닉네임 왼쪽, 태그 오른쪽 */
  align-items: center; /* 수직 중앙 정렬 */
  margin-top: 10px; /* 제목과 프로필 사이 간격 */
}

.nickname-container {
  display: flex;
  align-items: center; /* 닉네임과 프로필 이미지를 수직 중앙 정렬 */
}

.profile-image {
  width: 40px; /* 프로필 사진 크기 */
  height: 40px; /* 프로필 사진 크기 */
  border-radius: 50%; /* 원형 프로필 이미지 */
  margin-right: 10px; /* 이미지와 닉네임 사이 간격 */
}

.nickname {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px; /* 닉네임과 날짜 간 간격 */
}
.nickname-and-time {
  display: flex;
  flex-direction: column; /* 닉네임과 날짜를 수직 정렬 */
}

.tags-container {
  display: flex;
  gap: 8px; /* 태그 사이 간격 */
  flex-wrap: wrap; /* 태그가 많을 경우 다음 줄로 넘어감 */
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.tag {
  display: inline-block;
  background-color: #ffffff; /* 태그 배경색 (밝은 파란색) */
  color: #f4c4b7; /* 텍스트 색상 */
  font-size: 12px; /* 글자 크기 */
  font-weight: 600; /* 글자 두께 */
  padding: 4px 10px; /* 내부 여백 */
  border-radius: 12px; /* 둥근 모서리 */
  border: 1px solid #f4c4b7; /* 테두리 */
  transition: background-color 0.3s, color 0.3s; /* 호버 효과를 부드럽게 */
  cursor: default; /* 클릭 가능하지 않다는 표시 */
}

.tag:hover {
  background-color: #f4c4b7; /* 호버 시 배경색 */
  color: #fff; /* 호버 시 텍스트 색상 */
}

.tag-list {
  display: inline-block;
}


.post-image {
  width: 100%; /* 원하는 크기로 설정, 예: 50% */
  max-width: 140px; /* 최대 크기를 설정 */
  height: 200px; /* 비율을 유지하면서 크기 조정 */
  border-radius: 12px;
}
.post-content {
  min-height: 150px;
  max-height: 250px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  white-space: pre-line; /* 줄바꿈 유지 */
  font-size: 13px; /* 텍스트 크기 */
  line-height: 1.6; /* 줄 간격 */
  color: #333; /* 텍스트 색상 */
  margin-top: 20px; /* 상단 간격 */
  padding: 10px; /* 내부 여백 */
  border: 1px solid #ddd; /* 선택적 테두리 추가 */
  border-radius: 8px; /* 선택적 모서리 둥글게 */
}
.post-time {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}
.textarea-content {
  width: 96%;
  min-height: 150px;
  font-size: 16px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  resize: none;
}
/* 좋아요 버튼 스타일 */
.like-container {
  position: absolute;
  bottom: 10px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.like-icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
/* 댓글 입력란 스타일 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.comment-input .profile-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.comment-input .profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-input .nickname {
  font-weight: bold;
  margin-right: 10px;
}

.comment-input .textarea-comment {
  width: 100%;
  height: 60px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
}

.comment-input button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.comment-input button:hover {
  background-color: #45a049;
}

/* 댓글 목록 스타일 */
.comment-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-profile-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-nickname {
  font-weight: bold;
}

.comment-text {
  margin: 5px 0;
}

.comment-time {
  font-size: 0.85em;
  color: gray;
  margin-top: 5px;
}
.delete-comment-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
.delete-comment-btn:hover {
  background-color: darkred;
}
</style>
