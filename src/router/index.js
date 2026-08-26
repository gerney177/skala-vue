import { createRouter, createWebHistory } from 'vue-router'
import { validCityIds } from '../data/cityDetailMock.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather-home',
      // 요구사항 1: 라우터 지연 로딩 - 방문 시점에만 별도 청크로 로드
      component: () => import('../views/WeatherHomeView.vue'),
    },
    {
      path: '/about',
      name: 'weather-about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      // 동적 라우트: :cityId 세그먼트를 route.params.cityId로 전달
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
      // Navigation Guard: Mock Data에 없는 cityId면 화면을 그리기 전에 404로 리다이렉트
      beforeEnter: (to) => {
        if (!validCityIds.includes(to.params.cityId)) {
          return '/404'
        }
      },
    },
    {
      // 요구사항 6: 상기 정의된 view 이외에 추가로 작성한 view
      path: '/favorites',
      name: 'weather-favorites',
      component: () => import('../views/WeatherFavoritesView.vue'),
    },
    {
      // 요구사항 1: Catch-all Route - 반드시 routes 배열의 마지막에 위치해야 함
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { hideChrome: true },
    },
  ],
})

export default router
