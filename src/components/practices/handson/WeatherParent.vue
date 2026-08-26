<!--
  Hands on 3: Weather Component (컴포넌트 분리)
  요구사항 (슬라이드 기준)
    기능 변경 없이 Weather Composition(과제 2)을 4개 Component 파일로 분리
      1) WeatherParent.vue      - 모든 반응형 데이터 유지
      2) BaseDashboardCard.vue  - 검색박스와 리스트박스의 디자인 공통화, <slot> 배치
      3) SearchBar.vue          - searchQuery를 props로 전달받아 표시, update-query emit
      4) WeatherCard.vue        - 선택된 도시 객체를 props로 전달받아 표시, select-card/click-detail emit
    + 요구사항 7: 위 4개 중 리스트박스 영역을 한 번 더 쪼개서 FavoriteList.vue 추가 분리
       (favorites 배열을 props로 받아 렌더링만 하는 프레젠테이션 컴포넌트)
    -> 반응형 상태/computed/watch 로직은 Weather Composition과 동일하며,
       템플릿에서 그리던 UI만 자식 컴포넌트로 위임했습니다.
-->
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import FavoriteList from './FavoriteList.vue'

// 1일차 Weather Mockup의 weatherList와 동일한 형태(id/name/temp/status)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

// 검색어 상태
const searchQuery = ref('')

// 선택된 도시 정보 상태 (상태바에 표시할 값)
const selectedCityInfo = ref(null)

// ===== 본인만의 반응형 상태 (Weather Composition에서 추가한 것과 동일) =====
const favoriteCityIds = ref([]) // 즐겨찾기한 도시 id 목록
const tempUnit = ref('C') // 온도 단위 'C' | 'F'
const sortOrder = ref('asc') // 정렬 순서 'asc' | 'desc'
const searchHistory = ref([]) // 도시를 선택할 때마다 쌓이는 기록

// tempUnit에 맞춰 표시용 온도(displayTemp)/단위(unitLabel)를 붙인 기본 리스트
// -> 아래 filteredWeatherList, favoriteWeatherList가 전부 이 리스트를 기반으로 파생됨
const displayWeatherList = computed(() =>
  weatherList.value.map((city) => ({
    ...city,
    displayTemp: tempUnit.value === 'F' ? Math.round((city.temp * 9) / 5 + 32) : city.temp,
    unitLabel: tempUnit.value === 'F' ? '°F' : '°C',
  })),
)

// weatherList 중 searchQuery가 city.name에 포함된 항목만 반환
const filteredWeatherList = computed(() =>
  displayWeatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

// 정렬까지 적용된 최종 리스트 - 원본을 건드리지 않도록 복사본을 정렬
const sortedWeatherList = computed(() =>
  [...filteredWeatherList.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.temp - b.temp : b.temp - a.temp,
  ),
)

// 즐겨찾기한 도시만 모은 리스트
const favoriteWeatherList = computed(() =>
  displayWeatherList.value.filter((city) => favoriteCityIds.value.includes(city.id)),
)

// 최근 선택한 도시 - 중복 제거 후 최근 5개, 최신순
const recentSearches = computed(() => {
  const unique = [...new Set(searchHistory.value)]
  return unique.slice(-5).reverse()
})

// selectedCityInfo가 바뀔 때마다 콘솔로그 - watch는 "감시 대상"을 명시적으로 지정합니다
watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch 감지] 상태바 문구가 바뀌었습니다: '${oldValue}' -> '${newValue}'`)
})

// searchQuery를 추적해서 타이핑할 때마다 콘솔로그
// watchEffect는 콜백 안에서 "읽은" 반응형 값을 자동으로 추적합니다 (감시 대상을 따로 안 적어도 됨)
watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 도시를 필터링합니다.`)
})

// 즐겨찾기 개수가 바뀔 때마다 로그
watch(favoriteCityIds, (newValue) => {
  console.log(`[watch 감지] 즐겨찾기 도시 ${newValue.length}개`)
})

// 온도 단위가 바뀔 때마다 로그
watch(tempUnit, (newValue) => {
  console.log(`[watch 감지] 온도 단위가 '${newValue}'로 변경되었습니다.`)
})

// 정렬 순서가 바뀔 때마다 로그
watch(sortOrder, (newValue) => {
  console.log(`[watch 감지] 정렬 순서가 '${newValue}'로 변경되었습니다.`)
})

// 선택 기록이 추가될 때마다 로그
watch(searchHistory, (newValue) => {
  console.log(`[watch 감지] 최근 선택 기록: ${newValue.join(', ')}`)
})

// WeatherCard의 select-card 이벤트 핸들러: selectedCityInfo 갱신 + 선택 기록 추가
function selectCity(city) {
  selectedCityInfo.value = city.name
  searchHistory.value = [...searchHistory.value, city.name]
}

// WeatherCard의 click-detail 이벤트 핸들러
function showDetail(city) {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

// WeatherCard의 toggle-favorite 이벤트 핸들러
function toggleFavorite(city) {
  favoriteCityIds.value = favoriteCityIds.value.includes(city.id)
    ? favoriteCityIds.value.filter((id) => id !== city.id)
    : [...favoriteCityIds.value, city.id]
}

// 온도 단위 토글
function toggleTempUnit() {
  tempUnit.value = tempUnit.value === 'C' ? 'F' : 'C'
}

// 정렬 순서 토글
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <section class="weather-parent">
    <h2>🌤️ 과제 3: 날씨 (컴포넌트)</h2>

    <!-- 검색박스: BaseDashboardCard의 slot에 SearchBar를 배치 -->
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <!-- 리스트박스: BaseDashboardCard의 slot에 WeatherCard 목록을 배치 -->
    <BaseDashboardCard title="📍 지역별 날씨 현황">
      <div class="controls">
        <button type="button" @click="toggleTempUnit">🌡️ 단위 전환 (현재 °{{ tempUnit }})</button>
        <button type="button" @click="toggleSortOrder">
          🔀 정렬: {{ sortOrder === 'asc' ? '기온 낮은순' : '기온 높은순' }}
        </button>
      </div>

      <!-- 검색어 유무 / 일치 여부에 따라 분기해서 표시 -->
      <template v-if="!searchQuery || filteredWeatherList.length > 0">
        <WeatherCard
          v-for="city in sortedWeatherList"
          :key="city.id"
          :city="city"
          :is-favorite="favoriteCityIds.includes(city.id)"
          @select-card="selectCity"
          @click-detail="showDetail"
          @toggle-favorite="toggleFavorite"
        />
      </template>
      <p v-else class="no-result">검색 결과가 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <!-- 요구사항 7: 즐겨찾기 목록을 FavoriteList로 추가 분리 -->
    <BaseDashboardCard title="⭐ 즐겨찾기 도시">
      <FavoriteList :favorites="favoriteWeatherList" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🕘 최근 선택한 도시">
      <p v-if="recentSearches.length === 0" class="no-result">아직 선택한 도시가 없습니다.</p>
      <ol v-else>
        <li v-for="name in recentSearches" :key="name">{{ name }}</li>
      </ol>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo ? `${selectedCityInfo}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </div>
  </section>
</template>

<style scoped>
.weather-parent {
  max-width: 480px;
  margin: 0 auto;
  font-family: sans-serif;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.controls button {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f7f7f7;
  cursor: pointer;
}

.weather-parent ol {
  margin: 0;
  padding-left: 1.2rem;
}

.no-result {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}

.status-bar {
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: #eafaf1;
  color: #2e7d32;
}
</style>
