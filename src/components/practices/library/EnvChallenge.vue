<!--
  Code Challenge (Vite Build & Deployment): env
  요구사항 (슬라이드 기준)
    - .env.staging / .env.production에 VITE_API_URL을 각각 다르게 설정
    - 컴포넌트 내부에서 import.meta.env.VITE_API_URL을 console.log로 출력
    - package.json에 build:staging / build:production 스크립트를 추가하고,
      npm run build:staging 실행 시 터미널 컴파일 라인에서 어떤 환경 파일이 로드되는지 관측
-->
<script setup>
// Vite 환경 변수 참조 (런타임 빌드 시 --mode에 따라 값이 동적으로 주입됨)
const currentApiUrl = import.meta.env.VITE_API_URL
const currentMode = import.meta.env.MODE

console.log('현재 주입된 API 서버 주소:', currentApiUrl)
</script>

<template>
  <div class="practice-section">
    <h2>Environment Variables 실습</h2>
    <p>현재 빌드 모드: {{ currentMode }}</p>
    <p>연동 API 엔드포인트: {{ currentApiUrl }}</p>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 360px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
</style>
