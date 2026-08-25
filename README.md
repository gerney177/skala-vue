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