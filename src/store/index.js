import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: false, // 로그인 여부 확인
    user: null, // 사용자 정보 저장 (닉네임 등)
    posts: [] // 게시물 목록
  },
  mutations: {
    setUser(state, user) {
      state.isAuthenticated = true;
      state.user = user; // 로그인 후 사용자 정보 저장
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.user = null; // 로그아웃 시 사용자 정보 삭제
    },
    setPosts(state, posts) {
      state.posts = posts; // 전체 게시물 설정
    },
    addPost(state, post) {
      state.posts.unshift(post); // 새 게시물 목록 맨 앞에 추가
    }
  },
  actions: {
    async checkSession({ commit }) {
      try {
        const response = await axios.get('/check-session', { withCredentials: true });
        if (response.data.isAuthenticated) {
          commit('setUser', response.data.user); // 세션이 유효할 경우 사용자 정보 저장
        }
      } catch (error) {
        console.error('세션 확인 중 오류 발생:', error);
      }
    },
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('/login', loginData, { withCredentials: true });
        commit('setUser', response.data.user); // 로그인 성공 후 사용자 정보 저장
      } catch (error) {
        throw new Error('로그인 실패: ' + error.response.data.message);
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/logout', {}, { withCredentials: true });
        commit('clearUser'); // 로그아웃 성공 후 사용자 정보 삭제
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    },
    // 게시물 목록 가져오기
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('/posts');
        commit('setPosts', response.data); // 서버에서 받은 게시물 저장
      } catch (error) {
        console.error('게시물 가져오기 실패:', error);
      }
    },
    // 게시물 추가
    async addPost({ commit }, newPost) {
      try {
        const response = await axios.post('/posts', newPost);
        commit('addPost', response.data); // 서버에서 반환된 새 게시물 추가
      } catch (error) {
        console.error('게시물 추가 실패:', error);
      }
    }
  },
  getters: {
    posts: (state) => state.posts,
    getPostById: (state) => (id) => state.posts.find((post) => post.id === id)
  }
});

export default store;
