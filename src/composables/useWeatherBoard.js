// Hands on 4: Weather Router - 공유 상태 (Composable)
//
// WeatherHomeView와 WeatherFavoritesView가 같은 즐겨찾기/최근기록 상태를 봐야 하는데,
// 각 View는 라우터가 바뀔 때마다 마운트/언마운트되므로 컴포넌트 내부 ref로 두면 상태가 초기화됩니다.
// -> ref/computed를 "모듈 스코프"(함수 바깥)에 한 번만 만들어서 두 페이지가 같은 인스턴스를 공유하게 합니다.
//    (ES 모듈은 최초 import 시 한 번만 평가되므로, 이 파일을 import하는 모든 곳이 동일한 상태를 봅니다)
import { ref, computed, watch, watchEffect } from 'vue'
import { useConfigStore } from '../stores/configStore.js'

// 1일차 Weather Mockup의 weatherList와 동일한 형태(id/name/temp/status)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const favoriteCityIds = ref([])
const sortOrder = ref('asc')
const searchHistory = ref([])

// Hands on 5: Weather Store - 온도 단위는 더 이상 로컬 ref가 아니라
// Pinia configStore(unit/unitSymbol)를 기준으로 계산합니다.
const configStore = useConfigStore()

const displayWeatherList = computed(() =>
  weatherList.value.map((city) => ({
    ...city,
    displayTemp:
      configStore.unit === 'fahrenheit' ? Math.round((city.temp * 9) / 5 + 32) : city.temp,
    unitLabel: configStore.unitSymbol,
  })),
)

const filteredWeatherList = computed(() =>
  displayWeatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

const sortedWeatherList = computed(() =>
  [...filteredWeatherList.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.temp - b.temp : b.temp - a.temp,
  ),
)

const favoriteWeatherList = computed(() =>
  displayWeatherList.value.filter((city) => favoriteCityIds.value.includes(city.id)),
)

const recentSearches = computed(() => {
  const unique = [...new Set(searchHistory.value)]
  return unique.slice(-5).reverse()
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch 감지] 상태바 문구가 바뀌었습니다: '${oldValue}' -> '${newValue}'`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 도시를 필터링합니다.`)
})

watch(favoriteCityIds, (newValue) => {
  console.log(`[watch 감지] 즐겨찾기 도시 ${newValue.length}개`)
})

watch(searchHistory, (newValue) => {
  console.log(`[watch 감지] 최근 선택 기록: ${newValue.join(', ')}`)
})

function selectCity(city) {
  selectedCityInfo.value = city.name
  searchHistory.value = [...searchHistory.value, city.name]
}

function toggleFavorite(city) {
  favoriteCityIds.value = favoriteCityIds.value.includes(city.id)
    ? favoriteCityIds.value.filter((id) => id !== city.id)
    : [...favoriteCityIds.value, city.id]
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

export function useWeatherBoard() {
  return {
    searchQuery,
    selectedCityInfo,
    favoriteCityIds,
    sortOrder,
    searchHistory,
    filteredWeatherList,
    sortedWeatherList,
    favoriteWeatherList,
    recentSearches,
    selectCity,
    toggleFavorite,
    toggleSortOrder,
  }
}
