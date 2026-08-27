<!--
  Hands on 4: Weather Router - FavoriteList
  과제 3(components/practices/handson)에서 만든 컴포넌트를 그대로 가져왔습니다.
  WeatherFavoritesView(요구사항 6: 추가 View)에서 사용합니다.

  Hands on - Weather UI Library
  빈 상태 안내를 Element Plus <el-empty>로 교체.
-->
<script setup>
defineProps({
  favorites: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="favorite-list">
    <el-empty v-if="favorites.length === 0" description="즐겨찾기한 도시가 없습니다. 대시보드 카드의 ☆를 눌러보세요." />
    <ul v-else>
      <li v-for="city in favorites" :key="city.id">{{ city.name }} · {{ city.displayTemp }}{{ city.unitLabel }} ({{ city.status }})</li>
    </ul>
  </div>
</template>

<style scoped>
.favorite-list ul {
  margin: 0;
  padding-left: 1.2rem;
}
</style>
