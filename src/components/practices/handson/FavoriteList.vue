<!--
  Hands on 3: Weather Component - FavoriteList (요구사항 7: 추가 컴포넌트)
  WeatherParent에 있던 "⭐ 즐겨찾기 도시" 목록 UI를 별도 컴포넌트로 분리했습니다.
  -> favorites 배열을 props로 전달받아 그대로 렌더링만 하는 프레젠테이션 컴포넌트
     (즐겨찾기 추가/제거 로직 자체는 WeatherParent가 계속 소유하고,
      이 컴포넌트는 이미 필터링된 결과만 보여줍니다)
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
    <p v-if="favorites.length === 0" class="no-result">
      즐겨찾기한 도시가 없습니다. 카드의 ☆를 눌러보세요.
    </p>
    <ul v-else>
      <li v-for="city in favorites" :key="city.id">
        {{ city.name }} · {{ city.displayTemp }}{{ city.unitLabel }} ({{ city.status }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.favorite-list ul {
  margin: 0;
  padding-left: 1.2rem;
}

.no-result {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}
</style>
