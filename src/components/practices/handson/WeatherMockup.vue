<!--
  Hands on 1: Weather Mockup
  요구사항 (슬라이드 기준)
    1) v-for로 weatherList 배열을 카드로 반복 렌더링 (:key에 id 바인딩 필수)
    2) v-if/v-else로 기온 25도 기준 "더움/선선함" 라벨 분기
    3) :value + @input(또는 v-model)으로 한글 도시명 검색 양방향 바인딩
    4) 카드 클릭 -> 상태바에 "{도시}이 선택되었습니다." 표기
       카드 내부 [상세보기] 버튼 클릭 -> 버블링 없이(@click.stop) window.alert
    5) 본인만의 데이터를 추가해서 weatherList를 확장/교체
-->
<script setup>
import { ref } from 'vue'

// 날씨 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '일산', temp: 31, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 23, status: '흐림' },
  { id: 'city_06', name: '광주', temp: 27, status: '맑음' },
  { id: 'city_07', name: '대구', temp: 25, status: '비' },
  { id: 'city_08', name: '제주', temp: 22, status: '맑음' },
])

// TODO (요구사항 3): 검색 input과 연결할 상태값
const searchKeyword = ref('')

// TODO (요구사항 4): 카드 클릭 시 상태바에 표시할 메시지
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

// TODO (요구사항 4): 카드 클릭 핸들러 - statusMessage를 "{도시}이(가) 선택되었습니다." 로 갱신
function selectCity(city) {
  statusMessage.value = `${city.name}이(가) 선택되었습니다.`
}

// TODO (요구사항 4): [상세보기] 버튼 핸들러 - 카드 클릭(selectCity)으로 버블링되지 않게
// 템플릿에서 @click.stop으로 연결하고, 여기서는 window.alert만 띄우세요.
function showDetail(cityName, status) {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <section class="weather-mockup">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>

    <div class="search-box">
      <label for="citySearch">🔍 도시 검색</label>
      <!-- TODO (요구사항 3): :value + @input 으로 searchKeyword 양방향 바인딩 -->
      <input :value="searchKeyword" @input="searchKeyword = $event.target.value" id="citySearch" type="text" placeholder="검색할 도시 이름 입력" />
      <p>검색 중인 도시: {{ searchKeyword }}</p>
    </div>

    <div class="weather-list">
      <h3>📍 지역별 날씨 현황</h3>

      <!-- TODO (요구사항 1): v-for="city in weatherList" :key="city.id" -->
      <div class="weather-card" v-for="city in weatherList" :key="city.id" @click="selectCity(city)">
        <div class="card-info">
          <p class="city-name">{{ city.name }} ({{ city.status }})</p>
          <p class="city-temp">현재 기온: {{ city.temp }}°C</p>

          <!-- TODO (요구사항 2): v-if="city.temp >= 25" / v-else 로 라벨 분기 -->
          <span class="badge dead" v-if="city.temp >= 30">☠️ 죽음 (30도 이상)</span>
          <span class="badge hot" v-else-if="city.temp >= 25 && city.temp < 30">🔥 더움 (25도 이상)</span>
          <span class="badge cool" v-else>🩵 선선함, 행복 (25도 미만)</span>
        </div>

        <!-- TODO (요구사항 4): @click.stop="showDetail(city.name, city.status)" -->
        <button type="button" @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>
    </div>

    <div class="status-bar">{{ statusMessage }}</div>
  </section>
</template>

<style scoped>
.weather-mockup {
  max-width: 480px;
  margin: 0 auto;
  font-family: sans-serif;
}

.search-box,
.weather-list {
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

.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #fff;
  margin-top: 0.4rem;
}

.badge.dead {
  background: #e70606;
}

.badge.hot {
  background: #b85151;
}

.badge.cool {
  background: #4a90d9;
}

.status-bar {
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: #eafaf1;
  color: #2e7d32;
}
</style>
