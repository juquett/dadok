import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'), // 로그인 여부 확인
    user: null, // 사용자 정보 저장 (닉네임 등)
  },
  mutations: {
    login(state, { token, user }) {
      state.isAuthenticated = true;
      state.user = user; // 로그인 후 사용자 정보 저장
      localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null; // 로그아웃 시 사용자 정보 삭제
      localStorage.removeItem('token'); // 토큰 삭제
    }
  },
  actions: {
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('http://172.16.111.42:8080/login', loginData);
        const { token, user } = response.data; // 서버에서 토큰과 사용자 정보 받아옴
        commit('login', { token, user }); // 로그인 후 토큰과 사용자 정보 저장
      } catch (error) {
        throw new Error('로그인 실패: ' + error.response.data.message);
      }
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userName: state => state.user ? state.user.name : '' // 사용자 이름 반환
  }
});

export default store;
