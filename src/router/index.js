import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // 메인 페이지 컴포넌트
import JoinPage from '@/components/JoinPage.vue'; // 회원가입 페이지 컴포넌트
import LoginPage from '@/components/LoginPage.vue';// 로그인 페이지 컴포넌트
import BoardPage from '@/components/BoardPage.vue';// 로그인 페이지 컴포넌트
import MonthBookpage from '@/components/MonthBookPage.vue'; //이달의책 페이지 컴포넌트
import MonthSeptember from '@/components/MonthBook/MonthSeptember.vue'; //이달의책 9월 컴포넌트
import MonthAugust from '@/components/MonthBook/MonthAugust.vue'; //이달의책 8월 컴포넌트
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
  {
    path: '/BoardPage',
    name: 'BoardPage',
    component: BoardPage, // 회원가입 페이지
  },
  {
    path: '/MonthBookPage',
    name: 'MonthBookPage',
    component: MonthBookpage, // 이달의책 페이지
  },
  {
    path: '/MonthSeptember',
    name: 'MonthSeptember',
    component: MonthSeptember, // 이달의책 9월 페이지
  },
  {
  path: '/MonthAugust',
  name: 'MonthAugust',
  component: MonthAugust, // 이달의책 8월 페이지
},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
