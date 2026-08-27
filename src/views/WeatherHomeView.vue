<!--
  Hands on 4: Weather Router - WeatherHomeView ( '/' 경로 )
  요구사항 (슬라이드 기준)
    - WeatherParent(과제 3)를 참고하여 '/' 경로에 맞게 작성
    - 상세보기 버튼 클릭 시 window.alert() 제거 -> Programmatic Navigation
      (router.push('/weather/' + id))
  -> 반응형 상태는 useWeatherBoard 컴포저블에서 가져와서 WeatherFavoritesView와 공유합니다.
  + Hands on 5: Weather Store - 요구사항 3: 메인 날씨에 단위 설정 변경 적용
    (온도 단위 토글 버튼은 App.vue의 전역 UnitToggler로 이동했고, 여기서는
     useWeatherBoard가 내부적으로 configStore를 참조해 displayTemp/unitLabel을 계산해줍니다)
  + Hands on - Weather Axios
    요구사항 1: OpenWeatherMap Current Weather API로 실제 날씨 데이터를 가져와 적용
      -> onMounted에서 fetchAllCurrentWeather() 호출 + "새로고침" 버튼으로 재호출
    요구사항 3: OpenWeatherMap이 아닌 별도의 외부 API(ipapi.co)로 접속 위치 감지해서 배너로 표시
  + Hands on - Weather UI Library
    위치 배너/에러 배너는 <el-alert>, 컨트롤 버튼은 <el-button>,
    통신 중에는 목록 영역에 v-loading 디렉티브, 검색 결과 없음은 <el-empty>로 교체.
-->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Refresh, Sort } from '@element-plus/icons-vue'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { useWeatherBoard } from '../composables/useWeatherBoard.js'

const router = useRouter()

const {
  searchQuery,
  selectedCityInfo,
  favoriteCityIds,
  sortOrder,
  isLoadingWeather,
  weatherLoadError,
  myLocation,
  filteredWeatherList,
  sortedWeatherList,
  favoriteWeatherList,
  selectCity,
  toggleFavorite,
  toggleSortOrder,
  fetchAllCurrentWeather,
  detectAndShowMyLocation,
} = useWeatherBoard()

// 요구사항 3: alert 대신 Programmatic Navigation으로 상세 페이지 이동
function goToDetail(city) {
  router.push('/weather/' + city.id)
}

onMounted(() => {
  fetchAllCurrentWeather()
  detectAndShowMyLocation()
})
</script>

<template>
  <section class="weather-home">
    <!-- 요구사항 3: ipapi.co로 감지한 접속 위치 배너 -->
    <el-alert
      v-if="myLocation"
      class="location-hint"
      type="info"
      :closable="false"
      show-icon
    >
      📍 현재 접속 위치로 추정되는 곳: <strong>{{ myLocation.city }}, {{ myLocation.countryName }}</strong>
    </el-alert>

    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard title="📍 지역별 날씨 현황">
      <div class="controls">
        <el-button :icon="Sort" @click="toggleSortOrder">
          정렬: {{ sortOrder === 'asc' ? '기온 낮은순' : '기온 높은순' }}
        </el-button>
        <el-button type="primary" :icon="Refresh" :loading="isLoadingWeather" @click="fetchAllCurrentWeather">
          실시간 날씨 새로고침
        </el-button>
      </div>

      <el-alert v-if="weatherLoadError" class="load-error" type="error" :closable="false" show-icon>
        {{ weatherLoadError }}
      </el-alert>

      <div v-loading="isLoadingWeather">
        <template v-if="!searchQuery || filteredWeatherList.length > 0">
          <WeatherCard
            v-for="city in sortedWeatherList"
            :key="city.id"
            :city="city"
            :is-favorite="favoriteCityIds.includes(city.id)"
            @select-card="selectCity"
            @click-detail="goToDetail"
            @toggle-favorite="toggleFavorite"
          />
        </template>
        <el-empty v-else description="검색 결과가 일치하는 도시가 없습니다." />
      </div>
    </BaseDashboardCard>

    <p class="favorites-hint">
      ⭐ 즐겨찾기 {{ favoriteWeatherList.length }}개 -
      <RouterLink to="/favorites">즐겨찾기 페이지에서 전체보기</RouterLink>
    </p>

    <el-alert type="success" :closable="false" class="status-bar">
      {{ selectedCityInfo ? `${selectedCityInfo}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </el-alert>
  </section>
</template>

<style scoped>
.weather-home {
  max-width: 480px;
  margin: 0 auto;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.controls .el-button {
  flex: 1;
  margin-left: 0;
}

.location-hint,
.load-error {
  margin-bottom: 0.75rem;
}

.favorites-hint {
  text-align: center;
  color: #666;
  margin-bottom: 1rem;
}

.status-bar {
  justify-content: center;
  text-align: center;
}
</style>
