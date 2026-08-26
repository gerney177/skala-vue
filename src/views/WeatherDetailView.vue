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
-->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cityDetailMockData } from '../data/cityDetailMock.js'

const route = useRoute()

const cityDetail = ref(null)

// 요구사항: Mount 시점에 route.params.cityId로 Mock Data에서 도시 객체 선택
onMounted(() => {
  cityDetail.value = cityDetailMockData.find((city) => city.id === route.params.cityId) ?? null
})
</script>

<template>
  <section class="weather-detail">
    <h3>📍 지역별 상세 기상 관측 정보</h3>

    <div v-if="cityDetail" class="detail-card">
      <p>📍 지정 지역: {{ cityDetail.region }}</p>
      <p>실시간 기온: {{ cityDetail.temp }}°C</p>
      <p>기상 현황: {{ cityDetail.status }}</p>
      <p>대기 습도: {{ cityDetail.humidity }}%</p>
      <p>현재 풍속: {{ cityDetail.windSpeed }}m/s</p>
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
