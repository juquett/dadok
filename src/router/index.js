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
import PostListView from '@/components/posts/PostListView.vue'; //게시판 목록
import PostCreateView from '@/components/posts/PostCreateView.vue'; //게시판 글쓰기
import PostDetailView from '@/components/posts/PostDetailView.vue'; //게시판 디테일
import PostEditView from '@/components/posts/PostEditView.vue'; //게시판 수정



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
    component: BoardPage, // 게시판 페이지
    // meta: { requiresAuth: true }
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: myPage, // 마이페이지
    meta: { requiresAuth: true } //로그인 권한
  },
  {
    path: '/post',
    name: 'PostListView',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreateView',
    component: PostCreateView,
  },
  {
    path: '/posts/:id',
    name: 'PostDetailView',
    component: PostDetailView,
    props: true,
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEditView',
    component: PostEditView,
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
    name: 'BookPage10',
    component: MonthBookpage, // 이달의책 10월 페이지
  },
  {
    path: '/MonthSeptember',
    name: 'BookPage9',
    component: MonthSeptember, // 이달의책 9월 페이지
  },
  {
  path: '/MonthAugust',
  name: 'BookPage8',
  component: MonthAugust, // 이달의책 8월 페이지
  },
  {
    path: '/MonthJuly',
    name: 'BookPage7',
    component: MonthJuly, // 이달의책 7월 페이지
  },
  {
    path: '/MonthJune',
    name: 'BookPage6',
    component: MonthJune, // 이달의책 6월 페이지
  },
  {
    path: '/MonthMay',
    name: 'BookPage5',
    component: MonthMay, // 이달의책 5월 페이지
  },
  {
    path: '/MonthApril',
    name: 'BookPage4',
    component: MonthApril, // 이달의책 4월 페이지
  },
  {
    path: '/MonthMarch',
    name: 'BookPage3',
    component: MonthMarch, // 이달의책 3월 페이지
  },
  {
    path: '/MonthFebruary',
    name: 'BookPage2',
    component: MonthFebruary, // 이달의책 2월 페이지
  },
  {
    path: '/MonthJanuary',
    name: 'BookPage1',
    component: MonthJanuary, // 이달의책 1월 페이지
  },

  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스 입니다.');
      next('/LoginPage'); // 로그인되지 않은 경우 로그인 페이지로 이동
    } else {
      next(); // 로그인된 경우 다음 페이지로 이동
    }
  } else {
    next(); // 인증이 필요 없는 페이지는 바로 접근
  }
});


export default router;
