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
import axios from 'axios';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDeleteConfirmationVisible: false, // 삭제 확인 모달 표시 여부
      isEditing: false, // 수정 모드 상태
    };
  },
  computed: {
    selectedPost() {
      return this.post || {};
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    showDeleteConfirmation() {
      this.isDeleteConfirmationVisible = true; // 삭제 확인 모달 열기
    },
    async confirmDelete() {
      try {
        const postId = this.selectedPost._id; // 서버에서 사용하는 _id를 사용
        const response = await axios.delete(`/api/posts/${postId}`);

        alert(response.data.message); // 삭제 완료 메시지
        this.$emit("delete", this.selectedPost); // 부모 컴포넌트에 삭제된 게시물 전달
        this.goToBoard();

        this.isDeleteConfirmationVisible = false; // 삭제 확인 모달 닫기
        this.closeModal(); // 모달 닫기
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('게시물 삭제에 실패했습니다.');
      }
    },
    cancelDelete() {
      this.isDeleteConfirmationVisible = false; // 삭제 취소 시 모달 닫기
    },
    startEditing() {
      this.isEditing = true; // 수정 모드로 전환
    },
    async saveChanges() {
    try {
      const postId = this.selectedPost._id; // 게시물 ID
      const updatedPost = {
        title: this.selectedPost.title,
        content: this.selectedPost.content,
      };

      // 서버로 PUT 요청 보내기
      const response = await axios.put(`/api/posts/${postId}`, updatedPost);

      if (response.status === 200) { // 성공적인 응답 확인
        alert("게시물이 수정되었습니다."); // 성공 메시지
        this.$emit("update", response.data); // 부모 컴포넌트에 수정된 데이터 전달
        this.isEditing = false; // 수정 모드 종료
      } else {
        alert("게시물 수정에 실패했습니다."); // 오류 메시지
      }
    } catch (error) {
      console.error("게시물 수정 오류:", error);
      alert("게시물 수정에 실패했습니다."); // 예외 처리
    }
  },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    goToBoard() {
      this.$router.push({ name: "PostListView" }); // 게시물 목록 페이지로 이동
    },
  }
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
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
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
</style>
