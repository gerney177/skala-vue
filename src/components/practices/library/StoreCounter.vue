<!--
  Code Challenge: Counter Store (Pinia Basic)
  Step 3: Store 사용하기
    ① Import Store
    ② Instance 가동 (전역 저장소 포인터 확보)
    ③ state/getter/action 사용
  -> Vue Devtools의 Pinia 탭에서 counter 스토어의 state(count)/getters(doubleCount)가
     실시간으로 바뀌는 것을 확인할 수 있습니다.
-->
<script setup>
// ① 정의한 카운터 스토어 플러그인 import
import { useCounterStore } from '@/stores/counter.js'

// ② 인스턴스 가동 (전역 저장소 포인터 확보)
const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>Counter Store 활용 실습</h2>

    <p>원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong></p>
    <p>2배 연산 데이터(getters): <span>{{ counterStore.doubleCount }}</span></p>

    <button type="button" @click="counterStore.increment">숫자 1 증가 (actions)</button>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 360px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  font-family: sans-serif;
}

.practice-section button {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f7f7f7;
  cursor: pointer;
}
</style>
