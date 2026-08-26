<!--
  Hands on 4: Weather Router - WeatherFavoritesView ( '/favorites' 경로 )
  요구사항 6: 상기 정의된 view(Home/About/Detail/NotFound) 이외에 본인의 추가 view를 작성하고 Routing 한다.
  -> WeatherHomeView에 있던 "즐겨찾기 도시"와 "최근 선택한 도시" 영역을 별도 페이지로 분리했습니다.
     useWeatherBoard 컴포저블이 모듈 스코프 상태라, Home에서 즐겨찾기한 내용이
     페이지를 이동해도(재마운트되어도) 그대로 유지됩니다.
-->
<script setup>
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import FavoriteList from '../components/exercise/FavoriteList.vue'
import { useWeatherBoard } from '../composables/useWeatherBoard.js'

const { favoriteWeatherList, recentSearches } = useWeatherBoard()
</script>

<template>
  <section class="weather-favorites">
    <BaseDashboardCard title="⭐ 즐겨찾기 도시">
      <FavoriteList :favorites="favoriteWeatherList" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🕘 최근 선택한 도시">
      <p v-if="recentSearches.length === 0" class="no-result">아직 선택한 도시가 없습니다.</p>
      <ol v-else>
        <li v-for="name in recentSearches" :key="name">{{ name }}</li>
      </ol>
    </BaseDashboardCard>

    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-favorites {
  max-width: 480px;
  margin: 0 auto;
}

.weather-favorites ol {
  margin: 0;
  padding-left: 1.2rem;
}

.no-result {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
}
</style>
