// Hands on 4: Weather Router - 공유 상태 (Composable)
//
// WeatherHomeView와 WeatherFavoritesView가 같은 즐겨찾기/최근기록 상태를 봐야 하는데,
// 각 View는 라우터가 바뀔 때마다 마운트/언마운트되므로 컴포넌트 내부 ref로 두면 상태가 초기화됩니다.
// -> ref/computed를 "모듈 스코프"(함수 바깥)에 한 번만 만들어서 두 페이지가 같은 인스턴스를 공유하게 합니다.
//    (ES 모듈은 최초 import 시 한 번만 평가되므로, 이 파일을 import하는 모든 곳이 동일한 상태를 봅니다)
import { ref, computed, watch, watchEffect } from 'vue'
import { useConfigStore } from '../stores/configStore.js'
import { baseCities } from '../data/cities.js'
import { fetchCurrentWeather, detectMyLocation, hasApiKey } from '../services/weatherApi.js'

// Hands on - Weather Axios: 이제 온도/상태를 하드코딩하지 않고,
// 좌표(baseCities)만 초깃값으로 두고 fetchAllCurrentWeather()로 실시간 값을 채웁니다.
const weatherList = ref(baseCities.map((city) => ({ ...city, temp: null, status: '불러오는 중...' })))

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const favoriteCityIds = ref([])
const sortOrder = ref('asc')
const searchHistory = ref([])

// 요구사항 1/3: 실시간 통신 상태 (로딩/에러) + 요구사항 3의 IP 위치 감지 결과
const isLoadingWeather = ref(false)
const weatherLoadError = ref('')
const myLocation = ref(null)

// Hands on 5: Weather Store - 온도 단위는 더 이상 로컬 ref가 아니라
// Pinia configStore(unit/unitSymbol)를 기준으로 계산합니다.
const configStore = useConfigStore()

const displayWeatherList = computed(() =>
  weatherList.value.map((city) => ({
    ...city,
    displayTemp: typeof city.temp !== 'number' ? null : configStore.unit === 'fahrenheit' ? Math.round((city.temp * 9) / 5 + 32) : city.temp,
    unitLabel: configStore.unitSymbol,
  })),
)

const filteredWeatherList = computed(() => displayWeatherList.value.filter((city) => city.name.includes(searchQuery.value)))

const sortedWeatherList = computed(() => [...filteredWeatherList.value].sort((a, b) => (sortOrder.value === 'asc' ? (a.temp ?? 0) - (b.temp ?? 0) : (b.temp ?? 0) - (a.temp ?? 0))))

const favoriteWeatherList = computed(() => displayWeatherList.value.filter((city) => favoriteCityIds.value.includes(city.id)))

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
  favoriteCityIds.value = favoriteCityIds.value.includes(city.id) ? favoriteCityIds.value.filter((id) => id !== city.id) : [...favoriteCityIds.value, city.id]
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// 요구사항 1: OpenWeatherMap Current Weather API로 실제 날씨 데이터를 가져와 적용
// (슬라이드 예제와 동일하게 isLoading -> try -> catch -> finally 순서로 구성)
async function fetchAllCurrentWeather() {
  if (!hasApiKey()) {
    weatherLoadError.value = '.env 파일의 VITE_OPENWEATHER_API_KEY가 비어있습니다. OpenWeatherMap에서 발급받은 키를 넣고 dev 서버를 재시작하세요.'
    return
  }

  isLoadingWeather.value = true
  weatherLoadError.value = ''
  try {
    // axios.all과 같은 역할 - 여러 도시의 요청을 동시에 보내고 한 번에 기다림
    const results = await Promise.all(weatherList.value.map((city) => fetchCurrentWeather(city.lat, city.lon)))
    weatherList.value = weatherList.value.map((city, index) => ({ ...city, ...results[index] }))
  } catch (error) {
    // 4xx, 5xx 에러나 네트워크 오프라인 시 자동으로 reject되어 catch 영역에서 처리
    console.error('[Axios] 실시간 날씨 통신 중 에러가 발생했습니다:', error)
    weatherLoadError.value =
      error.response?.status === 401
        ? 'API 키가 아직 활성화되지 않았습니다. OpenWeatherMap 가입 후 키 활성화까지 최대 몇 시간 걸릴 수 있어요.'
        : '날씨 데이터를 가져오지 못했습니다. 네트워크 상태나 API 키를 확인해주세요.'
  } finally {
    isLoadingWeather.value = false
  }
}

// 요구사항 3: ipapi.co(OpenWeatherMap 외부의 별도 API)로 접속 위치를 감지해서 보여줌
async function detectAndShowMyLocation() {
  try {
    myLocation.value = await detectMyLocation()
  } catch (error) {
    console.error('[Axios] 위치 감지 통신 중 에러가 발생했습니다:', error)
    myLocation.value = null
  }
}

export function useWeatherBoard() {
  return {
    searchQuery,
    selectedCityInfo,
    favoriteCityIds,
    sortOrder,
    searchHistory,
    isLoadingWeather,
    weatherLoadError,
    myLocation,
    filteredWeatherList,
    sortedWeatherList,
    favoriteWeatherList,
    recentSearches,
    selectCity,
    toggleFavorite,
    toggleSortOrder,
    fetchAllCurrentWeather,
    detectAndShowMyLocation,
  }
}
