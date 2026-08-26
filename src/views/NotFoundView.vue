<!--
  Hands on 4: Weather Router - NotFoundView (Catch-all Route)
  요구사항: 정의되지 않은 경로 접근 시 표시되는 페이지
-->
<script setup></script>

<template>
  <section class="not-found">
    <p class="icon">🌤️❓</p>
    <h3>페이지를 찾을 수 없습니다.</h3>
    <p>요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.</p>
    <RouterLink to="/" class="back-link">날씨 메인으로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 360px;
  margin: 3rem auto 0;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem 1.5rem;
}

.icon {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  background: #2f6fed;
  color: #fff;
  text-decoration: none;
}
</style>
