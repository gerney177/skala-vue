<!--
  Hands on 3: Weather Component - BaseDashboardCard
  요구사항 (슬라이드 기준)
    - 검색박스와 리스트박스의 디자인을 공통화
    - <slot>을 배치하여 부모 컴포넌트가 도시 검색, 날씨 현황을 주입
  -> 데이터를 전혀 모르는 순수 프레젠테이션(디자인 전용) 컴포넌트입니다.
     title만 props로 받고, 실제 내용은 부모가 slot으로 채워 넣습니다.
-->
<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </section>
</template>

<style scoped>
.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.dashboard-card h3 {
  margin-top: 0;
}
</style>
