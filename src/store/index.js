import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: false, // 로그인 여부 확인
    user: null, // 사용자 정보 저장 (닉네임 등)
    posts: JSON.parse(localStorage.getItem('posts')) || []
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
    addPost(state, post) {
      state.posts.push(post);
      localStorage.setItem('posts', JSON.stringify(state.posts));
    }
  },
  actions: {
    async checkSession({ commit }) {
      try {
        const response = await axios.get('http://172.16.111.42:3000/check-session', { withCredentials: true });
        if (response.data.isAuthenticated) {
          commit('setUser', response.data.user); // 세션이 유효할 경우 사용자 정보 저장
        }
      } catch (error) {
        console.error('세션 확인 중 오류 발생:', error);
      }
    },
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('http://172.16.111.42:3000/login', loginData, { withCredentials: true });
        commit('setUser', response.data.user); // 로그인 성공 후 사용자 정보 저장
      } catch (error) {
        throw new Error('로그인 실패: ' + error.response.data.message);
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('http://172.16.111.42:3000/logout', {}, { withCredentials: true });
        commit('clearUser'); // 로그아웃 성공 후 사용자 정보 삭제
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    },
    // 게시물 추가
    addPost({ commit }, post) {
      commit('addPost', post); // 게시물 추가 액션
    }
  },
  getters: {
    posts: state => state.posts,
    getPostById: (state) => (id) => state.posts.find(post => post.id === id)
  }
});

export default store;
