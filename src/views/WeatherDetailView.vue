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
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cityDetailMockData } from '../data/cityDetailMock.js'
import { useConfigStore } from '../stores/configStore.js'

const route = useRoute()
const configStore = useConfigStore()

const cityDetail = ref(null)

// 요구사항: Mount 시점에 route.params.cityId로 Mock Data에서 도시 객체 선택
onMounted(() => {
  cityDetail.value = cityDetailMockData.find((city) => city.id === route.params.cityId) ?? null
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

    <div v-if="cityDetail" class="detail-card">
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
    <p v-else class="no-result">'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</p>

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

.back-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
}
</style>
