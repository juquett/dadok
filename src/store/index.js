// src/store/index.js
import { createStore } from 'vuex'; // createStore를 import
import axios from 'axios'; // axios를 import

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'), // 로그인 여부 확인
  },
  mutations: {
    login(state, token) {
      state.isAuthenticated = true;
      localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
    }
  },
  actions: {
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('http://25.6.251.212:8080/login', loginData);
        commit('login', response.data.token); // 로그인 후 토큰 저장
      } catch (error) {
        throw new Error('로그인 실패: ' + error.response.data.message);
      }
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  }
});

export default store;
