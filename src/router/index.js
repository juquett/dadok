import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // 메인 페이지 컴포넌트
import JoinPage from '@/components/JoinPage.vue'; // 회원가입 페이지 컴포넌트
import LoginPage from '@/components/LoginPage.vue';// 로그인 페이지 컴포넌트
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage, // 메인 페이지
  },
  {
    path: '/JoinPage',
    name: 'JoinPage',
    component: JoinPage, // 회원가입 페이지
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage, // 회원가입 페이지
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
