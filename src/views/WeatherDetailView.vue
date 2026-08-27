<!--
  Hands on 4: Weather Router - WeatherDetailView ( '/weather/:cityId' 경로, 동적 라우트 )
  요구사항 (슬라이드 기준)
    - 지역별 상세 기상관측 정보를 보여주는 페이지
    - 도시 코드에 해당하는 Mock Data를 임시로 활용
    - Router 동적 경로 매칭에 해당되는 도시ID(cityId)를 기반으로
      Mount 시점에 Mock Data에서 도시 객체 선택
  + 확장: 존재하지 않는 cityId는 router/index.js의 Navigation Guard(beforeEnter)에서
    이미 /404로 리다이렉트되므로, 여기까지 도달했다면 항상 유효한 cityId입니다.
    (아래 v-else는 그래도 남겨둔 방어 코드입니다)
  + Hands on 5: Weather Store - 요구사항 3: 상세 날씨에도 단위 설정 변경 적용
    (슬라이드 예시 코드와 동일한 패턴: configStore.unit을 참조해 표시용 값을 계산)
  + Hands on - Weather Axios
    요구사항 1: 더 이상 Mock Data가 아니라 OpenWeatherMap Current Weather API로 실제 값을 가져옴
    요구사항 2: OpenWeatherMap의 5 Day/3 Hour Forecast API를 추가로 호출해 "다음 예보" 표시
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { baseCities } from '../data/cities.js'
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi.js'
import { useConfigStore } from '../stores/configStore.js'

const route = useRoute()
const configStore = useConfigStore()

const cityMeta = baseCities.find((city) => city.id === route.params.cityId) ?? null
const cityDetail = ref(null)
const forecast = ref([])
const isLoading = ref(false)
const loadError = ref('')

// 요구사항: Mount 시점에 route.params.cityId로 좌표를 찾아 실시간 데이터를 요청
onMounted(async () => {
  if (!cityMeta) return

  isLoading.value = true
  loadError.value = ''
  try {
    // 요구사항 1 + 2: Current Weather API와 Forecast API를 동시에 호출
    const [weather, forecastList] = await Promise.all([
      fetchCurrentWeather(cityMeta.lat, cityMeta.lon),
      fetchForecast(cityMeta.lat, cityMeta.lon),
    ])
    cityDetail.value = { ...cityMeta, ...weather }
    forecast.value = forecastList
  } catch (error) {
    console.error('[Axios] 상세 날씨 통신 중 에러가 발생했습니다:', error)
    loadError.value = '상세 날씨 데이터를 가져오지 못했습니다. API 키 활성화 여부나 네트워크를 확인해주세요.'
  } finally {
    isLoading.value = false
  }
})

// 요구사항 3 예시 코드와 동일한 패턴 - 원본 데이터(섭씨/m/s)를 configStore 단위에 맞게 변환
const displayTemp = computed(() => {
  const rawTemp = cityDetail.value?.temp
  if (rawTemp == null) return null
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})

const displayWindSpeed = computed(() => {
  const rawWindSpeed = cityDetail.value?.windSpeed
  if (rawWindSpeed == null) return null
  if (configStore.windUnit === 'mph') {
    return (rawWindSpeed * 2.23694).toFixed(1) // m/s -> mph 변환 연산
  }
  return rawWindSpeed
})
</script>

<template>
  <section class="weather-detail">
    <h3>📍 지역별 상세 기상 관측 정보</h3>

    <p v-if="!cityMeta" class="no-result">'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</p>
    <template v-else>
      <p v-if="isLoading" class="no-result">⏳ 실시간 데이터를 불러오는 중...</p>
      <p v-else-if="loadError" class="load-error">⚠️ {{ loadError }}</p>
      <div v-else-if="cityDetail" class="detail-card">
        <p>📍 지정 지역: {{ cityDetail.region }}</p>
        <p>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>기상 현황: {{ cityDetail.status }}</p>
        <p>대기 습도: {{ cityDetail.humidity }}%</p>
        <p>
          현재 풍속: {{ displayWindSpeed }}{{ configStore.windUnitLabel }}
          <button type="button" class="wind-unit-btn" @click="configStore.toggleWindUnit">
            단위변경
          </button>
        </p>
      </div>

      <!-- 요구사항 2: 5 Day/3 Hour Forecast API로 가져온 다음 예보 -->
      <div v-if="forecast.length > 0" class="forecast-strip">
        <h4>🕐 다음 예보 (3시간 간격)</h4>
        <div class="forecast-list">
          <div v-for="slot in forecast" :key="slot.time" class="forecast-item">
            <p class="forecast-time">{{ slot.time }}</p>
            <p class="forecast-temp">{{ slot.temp }}°C</p>
            <p class="forecast-status">{{ slot.status }}</p>
          </div>
        </div>
      </div>
    </template>

    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.weather-detail {
  max-width: 480px;
  margin: 0 auto;
}

.detail-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.detail-card p {
  margin: 0.4rem 0;
}

.wind-unit-btn {
  margin-left: 0.4rem;
  padding: 0.15rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 999px;
  background: #f7f7f7;
  font-size: 0.75rem;
  cursor: pointer;
}

.no-result {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}

.load-error {
  color: #b33;
  background: #fdecea;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.forecast-strip {
  margin-top: 0.5rem;
}

.forecast-strip h4 {
  margin-bottom: 0.5rem;
}

.forecast-list {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.forecast-item {
  flex: 1 0 auto;
  min-width: 80px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
}

.forecast-item p {
  margin: 0.2rem 0;
  font-size: 0.85rem;
}

.forecast-time {
  color: #666;
  font-weight: bold;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
}
</style>
