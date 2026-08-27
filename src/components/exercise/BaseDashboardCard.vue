<!--
  Hands on - Weather UI Library
  BaseDashboardCard의 직접 만든 border/padding 스타일을 Element Plus의 <el-card>로 교체.
  title prop과 default slot이라는 외부 인터페이스는 그대로 유지해서,
  이 컴포넌트를 쓰는 다른 화면들(WeatherHomeView 등)은 코드를 바꾸지 않아도 됩니다.
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
  <el-card class="dashboard-card" shadow="never">
    <template v-if="title" #header>{{ title }}</template>
    <slot />
  </el-card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 1rem;
}
</style>
