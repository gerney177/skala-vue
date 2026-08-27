# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# skala-vue
## Hands on - Weather Mockup
1. 목업 데이터 추가
2. 조건부 렌더링에 else-if를 추가하여 3개의 조건으로 변경
3. 추가로 생성된 조건에 새로운 badge 색상 부여
- 이를 통해 양방향 데이터 바인딩이 어떻게 작동하는지 정확하게 알 수 있었다. 또한 조건부 렌더링에 조건을 하나 더 추가하려면, else-if를 추가해야 잘 작동하는 것도 알 수 있었다.

## Hands on - Weather Composition
1. searchQuery, selectedCityInfo, weatherList를 반응형 상태로 정의하고, 검색어로 필터링한 filteredWeatherList를 computed로 추가
2. selectedCityInfo는 watch로, searchQuery는 watchEffect로 감시하여 값이 바뀔 때마다 콘솔로그 작성
3. 검색어 유무와 결과 유무에 따라 v-if / v-else-if / v-else로 목록 표시를 분기 처리
4. 즐겨찾기, 온도 단위 변환, 정렬, 최근 선택 기록까지 나만의 반응형 상태·computed·watcher 4종 추가
- watch는 감시 대상을 직접 지정해야 하지만, watchEffect는 콜백 안에서 참조한 반응형 값을 자동으로 추적한다는 차이를 알 수 있었다. 또한 computed가 다른 computed를 입력으로 받아 값을 연쇄적으로 파생시킬 수 있다는 것도 알 수 있었다.

## Hands on - Weather Component (과제 3)
1. 검색박스와 리스트박스의 공통 디자인을 BaseDashboardCard로 분리하고, 내부 내용은 slot으로 주입받도록 구성
2. 도시 검색 입력은 SearchBar로, 카드 한 장은 WeatherCard로 분리해서 각각 props로 데이터를 전달받고 emit(update-query / select-card / click-detail)으로 부모에게 이벤트만 알리도록 설계
3. 즐겨찾기 목록도 FavoriteList로 한 번 더 분리 (요구사항 7: 추가 컴포넌트)
- props는 부모 → 자식으로만 흐르고, 자식은 emit으로 부모에게 이벤트만 알릴 뿐 상태를 직접 바꾸지 않는다는 "단방향 데이터 흐름"을 직접 만들어보며 체감할 수 있었다. slot을 쓰면 디자인(테두리, 여백, 제목)은 공통 컴포넌트가 갖고 내용물만 부모가 갈아 끼울 수 있다는 것도 알 수 있었다.

## Hands on - Weather Router (과제 4)
1. Vue Router에 '/', '/about', '/weather/:cityId'(동적 라우트), catch-all(404) 라우트를 전부 지연 로딩(lazy loading)으로 등록
2. App.vue에 Navigation Bar(RouterLink)와 RouterView를 배치해서 화면 전환을 라우터가 전담하도록 구조 변경
3. 상세보기 버튼 클릭 시 window.alert() 대신 router.push로 상세 페이지 이동 (Programmatic Navigation)
4. 존재하지 않는 cityId는 Navigation Guard(beforeEnter)에서 화면을 그리기 전에 걸러서 404로 리다이렉트
5. 즐겨찾기 페이지(/favorites)를 추가 View로 만들면서, 페이지를 이동해도 상태가 유지되도록 컴포저블을 모듈 스코프로 공유
- 컴포넌트 내부 ref는 라우트가 바뀌어 컴포넌트가 언마운트되면 초기화되기 때문에, 여러 페이지가 같은 상태를 봐야 할 때는 컴포저블을 모듈 스코프에 정의해서 공유해야 한다는 것을 알게 되었다. Navigation Guard가 화면을 그리기도 전에 라우팅 자체를 가로채서 리다이렉트할 수 있다는 것도 새로 알았다.

## Hands on - Weather Store (종합실습 5)
1. Pinia를 설치하고 main.js에 등록 (createPinia() 인스턴스 생성 후 app.use())
2. 날씨 단위를 관리하는 configStore 작성 (state: unit, getters: unitSymbol, actions: toggleUnit) + 나만의 추가로 풍속 단위(windUnit) 토글 기능도 함께 구현
3. Navigation Bar 옆에 UnitToggler를 배치해서 어느 화면에서든 단위를 바꿀 수 있게 구성
4. 메인 화면과 상세 화면 양쪽 모두 configStore 값을 기준으로 온도/풍속을 변환해서 표시
- 화면마다 로컬 상태로 따로 관리하던 값을 Pinia store 하나로 옮기니, 어느 컴포넌트에서 값을 바꾸든 앱 전체가 같은 값을 즉시 참조한다는 것을 알 수 있었다. props/emit으로 값을 일일이 전달하지 않아도 전역에서 공유되는 상태를 다루는 방식의 차이를 체감했다.

## Code Challenge - Counter Store (Pinia)
1. stores/counter.js에 useCounterStore 작성 (state: count, getters: doubleCount, actions: increment)
2. StoreCounter.vue에서 스토어를 import하고 인스턴스를 가져와 state/getter/action을 그대로 사용
- defineStore로 만든 함수는 use+이름+Store 규칙만 지키면 어디서든 호출할 수 있고, 호출할 때마다 새 인스턴스가 아니라 항상 같은 전역 인스턴스를 돌려받는다는 것을 알 수 있었다.

## Hands on - Weather Axios
1. axios 설치 후 OpenWeatherMap API 키를 .env(VITE_OPENWEATHER_API_KEY)로 분리해서 관리 (.env는 .gitignore 처리, .env.example만 공유)
2. Current Weather API로 서울/수원/부산의 실제 기온·날씨 상태를 가져와 기존 Mock 데이터를 대체 (메인 대시보드 + 상세 페이지 양쪽 모두 적용)
3. OpenWeatherMap의 5 Day/3 Hour Forecast API를 추가로 호출해서 상세 페이지에 "다음 예보" 스트립 표시 (요구사항 2: API 추가로 기능 확장)
4. ipapi.co(OpenWeatherMap이 아닌 별도의 외부 API, 키 불필요)로 접속 위치를 감지해서 대시보드 상단에 배너로 표시 (요구사항 3: 기타 외부 API 추가)
5. isLoading/에러 상태를 두어 API 키가 없거나(401) 활성화 전이거나 네트워크가 끊겼을 때도 화면이 깨지지 않고 안내 문구를 보여주도록 처리
- fetch API와 달리 axios는 응답을 자동으로 JSON으로 파싱해주고, 4xx/5xx 에러가 나면 자동으로 reject되어 catch에서 한 번에 처리할 수 있다는 걸 체감했다. 또한 API 키를 코드에 직접 넣지 않고 .env(import.meta.env)로 분리해두면, 키가 유출될 걱정 없이 코드만 공유할 수 있다는 것도 알게 되었다.