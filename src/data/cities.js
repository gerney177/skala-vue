// Hands on - Weather Axios
// 앱 전체에서 공유하는 도시 메타데이터(좌표 등) 단일 소스입니다.
// 기존에는 temp/status/humidity/windSpeed까지 하드코딩된 Mock 값이었지만,
// 이제 그 값들은 services/weatherApi.js를 통해 OpenWeatherMap에서 실시간으로 받아오므로
// 여기에는 좌표를 조회하기 위한 최소한의 정보만 둡니다.
export const baseCities = [
  { id: 'city_01', name: '서울', region: '대한민국 서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', region: '대한민국 경기도 수원시', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', region: '대한민국 부산광역시', lat: 35.1796, lon: 129.0756 },
]

// router/index.js의 Navigation Guard(잘못된 cityId 방어)가 참조하는 유효 id 목록
export const validCityIds = baseCities.map((city) => city.id)
