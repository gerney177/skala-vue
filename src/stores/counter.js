// Code Challenge: Counter Store (Pinia Basic)
// Step 2: Store 생성하기 - defineStore()로 생성한 Store Instance를 할당하는 변수의
// 식별자는 use+파일명+Store 규칙에 따라 useCounterStore로 작성합니다.
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // state: 반응형 상태 변수
  const count = ref(0)

  // getters: count를 기반으로 실시간 연동되는 읽기 전용 계산값
  const doubleCount = computed(() => count.value * 2)

  // actions: state 값을 안전하게 변경하는 함수
  function increment() {
    count.value++
  }

  // Expose: 이 스토어를 사용하는 컴포넌트가 접근할 수 있도록 반환
  return { count, doubleCount, increment }
})
