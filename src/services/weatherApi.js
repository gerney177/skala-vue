// Hands on - Weather Axios
// OpenWeatherMap / IP 위치 API와 통신하는 axios 래퍼 모듈.
//
// 과제 요구사항
//   1) OpenWeatherMap API를 통해 실제 날씨 데이터를 가져와 적용한다.
//      -> fetchCurrentWeather()  (Current Weather API)
//   2) OpenWeatherMap에서 제공되는 API를 추가하여 Application 기능을 확장한다.
//      -> fetchForecast()  (5 Day / 3 Hour Forecast API - 상세 페이지의 "다음 예보"에 사용)
//   3) 기타 외부 API를 추가하여 Application 기능을 확장한다.
//      -> detectMyLocation()  (ipapi.co - OpenWeatherMap이 아닌 별도의 IP 기반 위치 API, 키 불필요)
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// axios.create로 BaseURL이 고정된 전용 인스턴스 생성 (요구사항 표 "인스턴스 생성" 항목)
const owmClient = axios.create({
  baseURL: 'https://api.openweathermap.org',
})

// .env에 키가 채워져 있는지 확인 (없으면 화면에서 안내만 하고 통신은 시도하지 않음)
export function hasApiKey() {
  return Boolean(API_KEY) && !API_KEY.includes('여기에')
}

// 요구사항 1: Current Weather API - 좌표 기반으로 실시간 날씨 조회
export async function fetchCurrentWeather(lat, lon) {
  const response = await owmClient.get('/data/2.5/weather', {
    params: { lat, lon, appid: API_KEY, units: 'metric', lang: 'kr' },
  })
  const data = response.data
  return {
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  }
}

// 요구사항 2: 5 Day / 3 Hour Forecast API - Current Weather API와는 다른 OpenWeatherMap 엔드포인트
// (앱 기능 확장: 상세 페이지에서 앞으로의 기온 변화를 몇 시간 단위로 보여준다)
export async function fetchForecast(lat, lon) {
  const response = await owmClient.get('/data/2.5/forecast', {
    params: { lat, lon, appid: API_KEY, units: 'metric', lang: 'kr' },
  })
  // 3시간 간격 예보 중 앞부분 4개(다음 12시간)만 추려서 사용
  return response.data.list.slice(0, 4).map((entry) => ({
    time: entry.dt_txt.slice(11, 16), // "2024-01-01 15:00:00" -> "15:00"
    temp: Math.round(entry.main.temp),
    status: entry.weather[0].description,
  }))
}

// 요구사항 3: OpenWeatherMap이 아닌 별도의 외부 API (ipapi.co) - IP 기반 현재 위치 감지, API 키 불필요
export async function detectMyLocation() {
  const response = await axios.get('https://ipapi.co/json/')
  return {
    city: response.data.city,
    countryName: response.data.country_name,
  }
}
