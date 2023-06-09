import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";

import './assets/main.css'

const app = createApp(App)
// app.use(mavonEditor)
app.use(Antd)
app.use(createPinia())
app.use(router)
app.mount('#app')
