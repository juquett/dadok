<template>
  <div>
    <!-- 플로팅 위젯 -->
    <div class="floating-widget" @click="toggleMBTISelector">
      <p v-if="!showMBTISelector">MBTI</p> <!-- 원형 버튼 안에 "MBTI" 텍스트 -->
    </div>

    <!-- MBTI 선택창 (플로팅 위젯 클릭 시 나타남) -->
    <div v-if="showMBTISelector" class="mbti-selector" :style="mbtiSelectorPosition">
      <h2>MBTI로 보는 책 추천!</h2>
      <select v-model="selectedMBTI">
        <option disabled value="">MBTI 선택</option>
        <option v-for="mbti in mbtiOptions" :key="mbti" :value="mbti">{{ mbti }}</option>
      </select>

      <!-- MBTI에 맞는 책 추천 목록 (하나의 책만 추천) -->
      <div v-if="recommendedBooks.length">
        <h4>추천 책:</h4>
        <div class="book">
          <img :src="recommendedBooks[0].image" :alt="recommendedBooks[0].title" class="book-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMBTISelector: false,
      selectedMBTI: "",
      mbtiOptions: ["INFP", "INFJ", "ISFP", "ISFJ", "ISTP", "INTP", "ISTJ", "INTJ", "ENFP", "ESFP", "ENFJ", "ESFJ", "ENTP", "ENTJ", "ESTP", "ESTJ"],
      booksByMBTI: {
        INFP: { title: "Book 1", image: require('@/assets/infp.jpg') }, // 로컬 이미지 사용 예시
        INFJ: { title: "Book 4", image: require('@/assets/infj.jpg') },
        ISFP: { title: "Book 7", image: require('@/assets/isfp.jpg') },
        ISFJ: { title: "Book 10", image: require('@/assets/isfj.jpg') },
        ISTP: { title: "Book 13", image: require('@/assets/istp.jpg') },
        INTP: { title: "Book 10", image: require('@/assets/intp.jpg') },
        ISTJ: { title: "Book 10", image: require('@/assets/istj.jpg') },
        INTJ: { title: "Book 10", image: require('@/assets/intj.jpg') },
        ENFP: { title: "Book 10", image: require('@/assets/enfp.jpg') },
        ESFP: { title: "Book 10", image: require('@/assets/esfp.jpg') },
        ENFJ: { title: "Book 10", image: require('@/assets/enfj.jpg') },
        ESFJ: { title: "Book 10", image: require('@/assets/esfj.jpg') },
        ENTP: { title: "Book 10", image: require('@/assets/entp.jpg') },
        ENTJ: { title: "Book 10", image: require('@/assets/entj.jpg') },
        ESTP: { title: "Book 10", image: require('@/assets/estp.jpg') },
        ESTJ: { title: "Book 10", image: require('@/assets/estj.jpg') },

      },
      recommendedBooks: [],
      floatingWidgetPosition: { bottom: '20px', right: '20px' },
    };
  },
  computed: {
    mbtiSelectorPosition() {
      const widgetBottom = parseInt(this.floatingWidgetPosition.bottom, 10);
      const widgetRight = parseInt(this.floatingWidgetPosition.right, 10);

      return {
        position: 'fixed',
        bottom: `${widgetBottom + 80}px`, // 위젯 바로 위에 위치
        right: `${widgetRight}px`,
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        zIndex: 5,
        transition: 'all 0.3s ease',
      };
    },
  },
  methods: {
    toggleMBTISelector() {
      this.showMBTISelector = !this.showMBTISelector;
    },
  },
  watch: {
    selectedMBTI(newMBTI) {
      this.recommendedBooks = this.booksByMBTI[newMBTI] ? [this.booksByMBTI[newMBTI]] : [];
    },
  },
};
</script>

<style scoped>
.floating-widget {
  position: fixed;
  bottom: 60px;
  right: 20px;
  background-color: #f3aeff; /* 부드러운 블루 색상 */
  padding: 10px;
  color: white;
  border-radius: 50%; /* 원형으로 만들기 */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px; /* 텍스트 크기 조정 */
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; /* 작은 원형 크기 */
  height: 40px; /* 작은 원형 크기 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floating-widget:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.floating-widget p {
  margin: 0;
}

.mbti-selector {
  font-family: 'Arial', sans-serif;
  width: 250px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 5;
  transition: opacity 0.3s ease;
  animation: fadeIn 0.3s ease;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #444;
  background-color: #f9f9f9;
}

select:focus {
  border-color: #3b9de0;
  outline: none;
}

.book {
  margin-top: 20px;
  text-align: center;
}

.book-image {
  width: 180px; /* 이미지 크기를 크게 설정 */
  height: 280px;
  object-fit: cover;
  border-radius: 10px;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
