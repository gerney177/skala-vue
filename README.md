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

## Code Challenge - UI Library (Element Plus)
1. 실습 1. 회원가입 Form & 인풋 제어: userForm(email, agree) 반응형 데이터 + handleRegister에서 이메일 형식/약관 동의 검증 후 ElMessage.error/warning/success로 안내. `<el-card>`/`<el-input>`/`<el-switch>`/`<el-button>` 사용
2. 실습 2. 커머스 상품 수량 및 평점 시스템: productQuantity/productRate 반응형 데이터를 `<el-input-number>`/`<el-rate>`로 조작하고 실시간 요약 카드에 반영
3. 실습 3. 시스템 피드백 & 프로그레스 인터랙션: ElMessageBox.confirm으로 삭제 여부 확인(성공/취소 각각 ElMessage) + setInterval로 20%씩 증가하는 `<el-progress>` 다운로드 시뮬레이션
- 직접 만들면 CSS와 상태 관리 코드를 다 짜야 했을 이메일 검증 폼, 별점, 프로그레스 바 같은 걸 컴포넌트 태그 하나로 완성할 수 있다는 걸 체감했다. ElMessage/ElMessageBox처럼 window.alert()/confirm()을 대체하는 세련된 피드백 컴포넌트가 기본 제공된다는 것도 알게 되었다.

## Hands on - Weather UI Library
1. element-plus, @element-plus/icons-vue 설치 및 main.js에 전역 등록 (app.use(ElementPlus) + CSS import)
2. BaseDashboardCard를 `<el-card>`로, SearchBar의 input을 `<el-input>`으로 교체 (props/emit 인터페이스는 그대로 유지해서 사용하는 쪽 코드는 수정 없이 재사용)
3. WeatherCard의 상태 라벨을 `<el-tag>`로, 즐겨찾기/상세보기 버튼을 `<el-button>`으로, 온도 단위 토글을 `<el-switch>`로 교체
4. 통신 중 카드 목록에 v-loading 디렉티브, 에러/위치 안내는 `<el-alert>`, 빈 상태(즐겨찾기 없음/검색 결과 없음)는 `<el-empty>`, 404 페이지는 `<el-result>`로 교체
- 커스텀 CSS로 일일이 만들던 카드/버튼/빈 상태 UI를 라이브러리 컴포넌트로 바꾸니 코드량이 줄고 디자인이 통일된다는 걸 체감했다. 다만 UI 라이브러리를 붙이면 번들 크기가 확 늘어난다는 것도 확인했다(전체 import 기준 약 1MB) - 실무에서는 필요한 컴포넌트만 불러오는 자동 import 플러그인을 함께 쓰는 이유를 알게 되었다.

## Code Challenge - ESLint / Prettier / env / build (Vite Build & Deployment)
1. ESLint: eslint.config.js에 eqeqeq(===) 강제, no-console off 등 Custom Rules 추가 → 실제 코드에 남아있던 `== null` 루즈 비교 3곳(useWeatherBoard.js, WeatherDetailView.vue)과 v-for의 미사용 index 1곳을 npm run lint로 잡아내서 수정 (최종 0 errors, 34 warnings)
2. Prettier: PrettierChallenge.vue에 정렬이 엉망인 코드(`const     myRegion    = \`Suwon\`  ;`)를 작성한 뒤 npm run format 실행 → 공백 정리 + 세미콜론 제거(semi:false) + 백틱은 보간 템플릿 리터럴이라 유지되는 것을 실제로 확인
3. env: .env.staging / .env.production에 VITE_API_URL을 다르게 설정하고 build:staging / build:production 스크립트로 각각 빌드 → 터미널의 "building client environment for staging/production" 로그와 번들 안에 실제로 다른 URL 문자열이 주입된 것을 grep으로 검증
4. build: npm run build로 dist/ 생성 확인, 파일마다 해시가 붙는 것(WeatherDetailView-xxxx.js)과 .vue 확장자가 전부 사라진 순수 html/js/css만 남는 것을 확인
- ESLint(문법 오류/버그)와 Prettier(줄바꿈/따옴표 등 스타일)의 역할이 명확히 분리되어 있고, 한쪽이 잡는 규칙을 다른 쪽에서 끄는(skipFormatting) 방식으로 두 도구가 충돌하지 않게 조율한다는 것을 알게 되었다. .env 파일은 이름 자체(.env.production 등)로 모드가 구분되고 --mode 옵션만 바꾸면 소스 수정 없이 다른 서버 주소로 빌드할 수 있다는 것도 실습으로 확인했다.

## Hands on - Weather Deployment
1. Source Code 품질관리: eslint.config.js Custom Rules 적용 후 npm run lint로 전체 점검, 실제로 있던 eqeqeq/no-unused-vars 에러 4건을 모두 수정해서 0 errors 상태로 만듦
2. API 키(OpenWeatherMap)는 이미 .env(VITE_OPENWEATHER_API_KEY)로 분리되어 있었고, .gitignore에서 .env/.env.local만 제외하고 .env.staging/.env.production(시크릿 없는 공용 설정)은 커밋 대상으로 남기도록 정리
3. npm run build로 최종 프로덕션 빌드 생성 (dist/, 1736 모듈, 해시 파일명)
4. npm run preview로 dist/ 산출물을 정적 서버로 직접 띄워서 실시간 날씨/위치 감지/Element Plus UI가 개발 모드와 동일하게 동작하는 것까지 확인 (실제 배포 서버 업로드는 본인이 선택한 호스팅 방식에 따라 별도 진행 필요)
- 개발 서버(npm run dev)와 빌드 산출물(dist/ + npm run preview)은 완전히 다른 실행 방식이라는 것, 그리고 dist/ 폴더 자체가 어떤 정적 호스팅 서비스에도 그대로 올릴 수 있는 완제품이라는 것을 확인했다.