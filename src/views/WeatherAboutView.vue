<!--
  Hands on 4: Weather Router - WeatherAboutView ( '/about' 경로 )
  요구사항: 적당한 내용 작성 및 메인 대시보드로 돌아가기 작성

  Hands on - Weather UI Library
  <el-card>로 감싸고, 돌아가기는 el-button + RouterLink 조합으로 교체.
-->
<script setup></script>

<template>
  <el-card class="weather-about" shadow="never">
    <template #header>ℹ️ 서비스 소개</template>
    <ul>
      <li>본 앱은 Vue 3 + Vue Router 4 기반으로 제작된 실습용 날씨 대시보드입니다.</li>
      <li><code>&lt;RouterLink&gt;</code>/<code>&lt;RouterView&gt;</code> 컴포넌트로 페이지 간 이동을 구현했습니다.</li>
      <li>클라이언트 사이드 라우팅을 통해 새로고침 없이 화면이 전환됩니다.</li>
      <li>URL 동적 경로 세그먼트(<code>/weather/:cityId</code>)를 통해 도시 상세 정보를 전달합니다.</li>
      <li>모든 라우트 컴포넌트는 지연 로딩(lazy loading)으로 등록되어 있습니다.</li>
      <li>Element Plus UI 라이브러리로 버튼/카드/입력/피드백 컴포넌트를 통일했습니다.</li>
    </ul>

    <RouterLink to="/" custom v-slot="{ navigate }">
      <el-button class="back-link" type="primary" @click="navigate">대시보드로 돌아가기</el-button>
    </RouterLink>
  </el-card>
</template>

<style scoped>
.weather-about {
  max-width: 480px;
  margin: 0 auto;
}

.weather-about ul {
  padding-left: 1.2rem;
  line-height: 1.7;
}

.back-link {
  display: block;
  width: 100%;
  margin-top: 1rem;
}
</style>
