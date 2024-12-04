import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';



const app = createApp(App);

axios.defaults.baseURL = 'http://25.6.251.212:3000'; // 백엔드 주소로 설정

app.config.globalProperties.$axios = axios; // Axios를 전역 속성으로 추가
app.use(store);
app.use(router);
app.mount('#app');
