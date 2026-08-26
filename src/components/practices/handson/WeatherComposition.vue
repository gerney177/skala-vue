<!--
  Hands on 2: Weather Composition
  요구사항 (슬라이드 기준)
    1) searchQuery, selectedCityInfo, weatherList를 반응형 상태로 정의 (1일차 Weather Mockup과 동일한 데이터 형태)
    2) computed로 filteredWeatherList 정의
       - weatherList 중 searchQuery가 도시 이름(city.name)에 포함된 항목만 필터링
    3) watch / watchEffect로 상태 변화 감시
       - watch(selectedCityInfo, ...) : 값이 바뀔 때마다 콘솔로그
       - watchEffect(...) : searchQuery를 추적해서 타이핑할 때마다 콘솔로그
    4) 템플릿에서 검색어 유무 / 일치 여부에 따라 분기해서 표시
       - searchQuery가 비어있으면 -> 전체 출력
       - searchQuery가 있고 결과 있음 -> 필터링된 목록 출력
       - searchQuery가 있는데 결과 없음 -> "일치하는 도시가 없습니다" 안내
    5) 본인만의 반응형 상태 변수, Computed, Watcher를 추가
       -> 즐겨찾기(⭐) / 온도 단위 변환(°C↔°F) / 정렬(오름·내림차순) / 최근 선택 기록, 4가지를 추가함
-->
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

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

// ===== 요구사항 5: 본인만의 반응형 상태 =====
const favoriteCityIds = ref([]) // (5-1) 즐겨찾기한 도시 id 목록
const tempUnit = ref('C') // (5-2) 온도 단위 'C' | 'F'
const sortOrder = ref('asc') // (5-3) 정렬 순서 'asc' | 'desc'
const searchHistory = ref([]) // (5-4) 도시를 선택할 때마다 쌓이는 기록

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

// (5-3 computed) 정렬까지 적용된 최종 리스트 - 원본을 건드리지 않도록 복사본을 정렬
const sortedWeatherList = computed(() =>
  [...filteredWeatherList.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.temp - b.temp : b.temp - a.temp,
  ),
)

// (5-1 computed) 즐겨찾기한 도시만 모은 리스트
const favoriteWeatherList = computed(() =>
  displayWeatherList.value.filter((city) => favoriteCityIds.value.includes(city.id)),
)

// (5-4 computed) 최근 선택한 도시 - 중복 제거 후 최근 5개, 최신순
const recentSearches = computed(() => {
  const unique = [...new Set(searchHistory.value)]
  return unique.slice(-5).reverse()
})

// (요구사항 3-1) selectedCityInfo가 바뀔 때마다 콘솔로그 - watch는 "감시 대상"을 명시적으로 지정합니다
watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch 감지] 상태바 문구가 바뀌었습니다: '${oldValue}' -> '${newValue}'`)
})

// (요구사항 3-2) searchQuery를 추적해서 타이핑할 때마다 콘솔로그
// watchEffect는 콜백 안에서 "읽은" 반응형 값을 자동으로 추적합니다 (감시 대상을 따로 안 적어도 됨)
watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 도시를 필터링합니다.`)
})

// (5-1 watcher) 즐겨찾기 개수가 바뀔 때마다 로그
watch(favoriteCityIds, (newValue) => {
  console.log(`[watch 감지] 즐겨찾기 도시 ${newValue.length}개`)
})

// (5-2 watcher) 온도 단위가 바뀔 때마다 로그
watch(tempUnit, (newValue) => {
  console.log(`[watch 감지] 온도 단위가 '${newValue}'로 변경되었습니다.`)
})

// (5-3 watcher) 정렬 순서가 바뀔 때마다 로그
watch(sortOrder, (newValue) => {
  console.log(`[watch 감지] 정렬 순서가 '${newValue}'로 변경되었습니다.`)
})

// (5-4 watcher) 선택 기록이 추가될 때마다 로그
watch(searchHistory, (newValue) => {
  console.log(`[watch 감지] 최근 선택 기록: ${newValue.join(', ')}`)
})

// 카드 클릭 시 selectedCityInfo 갱신 (Hands-on1의 selectCity와 유사) + 선택 기록 추가
function selectCity(city) {
  selectedCityInfo.value = city.name
  searchHistory.value = [...searchHistory.value, city.name]
}

function showDetail(cityName, status) {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// (5-1) 즐겨찾기 토글
function toggleFavorite(city) {
  favoriteCityIds.value = favoriteCityIds.value.includes(city.id)
    ? favoriteCityIds.value.filter((id) => id !== city.id)
    : [...favoriteCityIds.value, city.id]
}

// (5-2) 온도 단위 토글
function toggleTempUnit() {
  tempUnit.value = tempUnit.value === 'C' ? 'F' : 'C'
}

// (5-3) 정렬 순서 토글
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <section class="weather-composition">
    <h2>🌤️ 과제 2: 날씨 (컴포지션)</h2>

    <div class="search-box">
      <label for="citySearch2">🔍 도시 검색</label>
      <input
        id="citySearch2"
        type="text"
        placeholder="검색할 도시 이름 입력"
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
      />
      <p>검색 중인 도시: {{ searchQuery }}</p>
    </div>

    <div class="weather-list">
      <h3>📍 지역별 날씨 현황</h3>

      <div class="controls">
        <button type="button" @click="toggleTempUnit">🌡️ 단위 전환 (현재 °{{ tempUnit }})</button>
        <button type="button" @click="toggleSortOrder">
          🔀 정렬: {{ sortOrder === 'asc' ? '기온 낮은순' : '기온 높은순' }}
        </button>
      </div>

      <!-- 요구사항 4: 검색어 유무 / 일치 여부에 따라 세 갈래로 분기 -->
      <template v-if="!searchQuery">
        <!-- 검색어 없음 -> 전체 목록(단위 변환/정렬 적용) 출력 -->
        <div class="weather-card" v-for="city in sortedWeatherList" :key="city.id" @click="selectCity(city)">
          <div class="card-info">
            <p class="city-name">{{ city.name }} ({{ city.status }})</p>
            <p class="city-temp">현재 기온: {{ city.displayTemp }}{{ city.unitLabel }}</p>
          </div>
          <div class="card-actions">
            <button type="button" class="star-btn" @click.stop="toggleFavorite(city)">
              {{ favoriteCityIds.includes(city.id) ? '⭐' : '☆' }}
            </button>
            <button type="button" @click.stop="showDetail(city.name, city.status)">상세보기</button>
          </div>
        </div>
      </template>
      <template v-else-if="filteredWeatherList.length > 0">
        <!-- 검색어 있고 결과 있음 -> 필터링+단위 변환/정렬 적용된 목록 출력 -->
        <div class="weather-card" v-for="city in sortedWeatherList" :key="city.id" @click="selectCity(city)">
          <div class="card-info">
            <p class="city-name">{{ city.name }} ({{ city.status }})</p>
            <p class="city-temp">현재 기온: {{ city.displayTemp }}{{ city.unitLabel }}</p>
          </div>
          <div class="card-actions">
            <button type="button" class="star-btn" @click.stop="toggleFavorite(city)">
              {{ favoriteCityIds.includes(city.id) ? '⭐' : '☆' }}
            </button>
            <button type="button" @click.stop="showDetail(city.name, city.status)">상세보기</button>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 검색어 있는데 결과 없음 -> 안내 문구 -->
        <p class="no-result">검색 결과가 일치하는 도시가 없습니다.</p>
      </template>
    </div>

    <div class="favorite-list">
      <h3>⭐ 즐겨찾기 도시</h3>
      <p v-if="favoriteWeatherList.length === 0" class="no-result">
        즐겨찾기한 도시가 없습니다. 카드의 ☆를 눌러보세요.
      </p>
      <ul v-else>
        <li v-for="city in favoriteWeatherList" :key="city.id">
          {{ city.name }} · {{ city.displayTemp }}{{ city.unitLabel }} ({{ city.status }})
        </li>
      </ul>
    </div>

    <div class="history-list">
      <h3>🕘 최근 선택한 도시</h3>
      <p v-if="recentSearches.length === 0" class="no-result">아직 선택한 도시가 없습니다.</p>
      <ol v-else>
        <li v-for="name in recentSearches" :key="name">{{ name }}</li>
      </ol>
    </div>

    <div class="status-bar">
      {{ selectedCityInfo ? `${selectedCityInfo}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
    </div>
  </section>
</template>

<style scoped>
.weather-composition {
  max-width: 480px;
  margin: 0 auto;
  font-family: sans-serif;
}

.search-box,
.weather-list,
.favorite-list,
.history-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.search-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.5rem;
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

.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-btn {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0;
}

.favorite-list ul,
.history-list ol {
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
