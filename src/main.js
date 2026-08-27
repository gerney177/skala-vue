// view Application을 초기화하고 구성하는 역할
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App) // Vue Application을 생성하고 App.vue를 루트 컴포넌트로 설정

// Hands on 5: Weather Store - Pinia 등록 (createPinia() 인스턴스 생성 + use()로 등록)
app.use(createPinia())
app.use(router)

app.mount('#app')
