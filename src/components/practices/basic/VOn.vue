<script setup>
import { ref } from 'vue'
const count = ref(0)
function handleClick() {
    alert("버튼이 클릭되었습니다!")
}
const showAlert = () => {
    alert("함수가 성공적으로 호출되었습니다!")
}
</script>

<template>
    <button @click="count++">클릭 수: {{ count }}</button>
    <button @click="handleClick">클릭하세요</button>
    <button @click="showAlert">경고 표시</button>
    <div class="practice-section">
        <h2>v-on 이벤트 핸들링 기초</h2>
        <h3>1) 인라인 연산 처리</h3>
        <p>현재 카운트:: {{ count }}</p>
        <button @click="count++">1씩 증가</button>
        <br />
        <h3>2) 스크립트 함수 호출</h3>
        <button @click="handleClick">알림창 띄우기</button>
    </div>
</template>