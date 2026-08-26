<!--
  Hands on 4: Weather Router - WeatherAboutView ( '/about' 경로 )
  요구사항: 적당한 내용 작성 및 메인 대시보드로 돌아가기 작성
-->
<script setup></script>

<template>
  <section class="weather-about">
    <h3>ℹ️ 서비스 소개</h3>
    <ul>
      <li>본 앱은 Vue 3 + Vue Router 4 기반으로 제작된 실습용 날씨 대시보드입니다.</li>
      <li><code>&lt;RouterLink&gt;</code>/<code>&lt;RouterView&gt;</code> 컴포넌트로 페이지 간 이동을 구현했습니다.</li>
      <li>클라이언트 사이드 라우팅을 통해 새로고침 없이 화면이 전환됩니다.</li>
      <li>URL 동적 경로 세그먼트(<code>/weather/:cityId</code>)를 통해 도시 상세 정보를 전달합니다.</li>
      <li>모든 라우트 컴포넌트는 지연 로딩(lazy loading)으로 등록되어 있습니다.</li>
    </ul>

    <RouterLink to="/" class="back-link">대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-about {
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.weather-about ul {
  padding-left: 1.2rem;
  line-height: 1.7;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  padding: 0.6rem;
  border-radius: 6px;
  background: #2f6fed;
  color: #fff;
  text-decoration: none;
}
</style>
