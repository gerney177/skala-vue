<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null

console.log('1. [setup] 컴포넌트가 메모리에 생성. (Dom 접근 불가)')

onMounted(() => {
  console.log('2. [onMounted] 컴포넌트가 화면에 마운트 완료. (Dom 접근 가능)')
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

onUpdated(() => {
  console.log('3. [onUpdated] 컴포넌트가 업데이트 완료. (현재 count: ${count.value})')
})

onUnmounted(() => {
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 화면에서 제거됨. 타이머 청소 완료.')
})
</script>
