<template>
  <div id="app">
    <!-- 라우터에 의해 렌더링될 컴포넌트를 표시 -->
    <router-view></router-view>
    <FloatingWidget /> <!-- 플로팅 위젯 컴포넌트 추가 -->
  </div>
</template>

<script>
import FloatingWidget from './components/FloatingWidget.vue'; // 플로팅 위젯 컴포넌트
export default {
  name: 'App',
  FloatingWidget,
};
</script>

<style scoped>
/* 스타일 유지 */
</style>
