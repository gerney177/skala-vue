// Hands on 4: Weather Router - 상세 화면 Mock Data
// WeatherDetailView(화면 표시)와 router/index.js의 Navigation Guard(잘못된 cityId 방어)가
// 같은 도시ID 목록을 참조해야 해서 한 곳으로 모아뒀습니다.
export const cityDetailMockData = [
  { id: 'city_01', region: '대한민국 서울특별시', temp: 28, status: '맑음', humidity: 55, windSpeed: 2.5 },
  { id: 'city_02', region: '대한민국 경기도 수원시', temp: 24, status: '비', humidity: 78, windSpeed: 4.1 },
  { id: 'city_03', region: '대한민국 부산광역시', temp: 26, status: '구름', humidity: 62, windSpeed: 3.2 },
]

export const validCityIds = cityDetailMockData.map((city) => city.id)
