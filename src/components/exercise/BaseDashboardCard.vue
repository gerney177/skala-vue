<!--
  Hands on 4: Weather Router - BaseDashboardCard
  과제 3(components/practices/handson)에서 만든 컴포넌트를 그대로 가져왔습니다.
  라우터 실습용 부품은 components/exercise/ 폴더에 격리해서 보관합니다.
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
