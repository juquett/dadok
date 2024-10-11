import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // 메인 페이지 컴포넌트
import JoinPage from '@/components/JoinPage.vue'; // 회원가입 페이지 컴포넌트
import LoginPage from '@/components/LoginPage.vue';// 로그인 페이지 컴포넌트
import BoardPage from '@/components/BoardPage.vue';// 게시판 페이지 컴포넌트
import myPage from '@/components/myPage.vue'; //마이페이지 컴포넌트
//import MonthDecember from '@/components/MonthBook/MonthDecember.vue'; //이달의책 12월 컴포넌트
//import MonthNovember from '@/components/MonthBook/MonthNovember.vue'; //이달의책 11월 컴포넌트
import MonthBookpage from '@/components/MonthBookPage.vue'; //이달의책 메인 10월 페이지 컴포넌트 ( October )
import MonthSeptember from '@/components/MonthBook/MonthSeptember.vue'; //이달의책 9월 컴포넌트
import MonthAugust from '@/components/MonthBook/MonthAugust.vue'; //이달의책 8월 컴포넌트
import MonthJuly from '@/components/MonthBook/MonthJuly.vue'; //이달의책 7월 컴포넌트
import MonthJune from '@/components/MonthBook/MonthJune.vue'; //이달의책 6월 컴포넌트
import MonthMay from '@/components/MonthBook/MonthMay.vue'; //이달의책 5월 컴포넌트
import MonthApril from '@/components/MonthBook/MonthApril.vue'; //이달의책 4월 컴포넌트
import MonthMarch from '@/components/MonthBook/MonthMarch.vue'; //이달의책 3월 컴포넌트
import MonthFebruary from '@/components/MonthBook/MonthFebruary.vue'; //이달의책 2월 컴포넌트
import MonthJanuary from '@/components/MonthBook/MonthJanuary.vue'; //이달의책 1월 컴포넌트


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
    path: '/myPage',
    name: 'myPage',
    component: myPage, // 마이페이지
  },



  //이달의책 1~12월 페이지
  // {
  //   path: '/MonthDecember',
  //   name: 'MonthDecember',
  //   component: MonthDecember, // 이달의책 12월 페이지
  // },
  // {
  //   path: '/MonthNovember',
  //   name: 'MonthNovember',
  //   component: MonthNovember, // 이달의책 11월 페이지
  // },
  {
    path: '/MonthBookPage',
    name: 'MonthBookPage',
    component: MonthBookpage, // 이달의책 10월 페이지
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
  {
    path: '/MonthJuly',
    name: 'MonthJuly',
    component: MonthJuly, // 이달의책 7월 페이지
  },
  {
    path: '/MonthJune',
    name: 'MonthJune',
    component: MonthJune, // 이달의책 6월 페이지
  },
  {
    path: '/MonthMay',
    name: 'MonthMay',
    component: MonthMay, // 이달의책 5월 페이지
  },
  {
    path: '/MonthApril',
    name: 'MonthApril',
    component: MonthApril, // 이달의책 4월 페이지
  },
  {
    path: '/MonthMarch',
    name: 'MonthMarch',
    component: MonthMarch, // 이달의책 3월 페이지
  },
  {
    path: '/MonthFebruary',
    name: 'MonthFebruary',
    component: MonthFebruary, // 이달의책 2월 페이지
  },
  {
    path: '/MonthJanuary',
    name: 'MonthJanuary',
    component: MonthJanuary, // 이달의책 1월 페이지
  },
  
  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
