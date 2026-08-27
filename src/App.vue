<!-- SFC(Single File Component) 3단 구조 
script, template, style로 구성되어 있음 
-->

<!-- main.js에서 호출되는 어플리케이션 루트 Vue 컴포넌트 -->
<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import VBind from './components/practices/basic/VBind.vue'
import VBindExample from './components/practices/basic/VBindExample.vue'
import VCloak from './components/practices/basic/VCloak.vue'
import VElseIf from './components/practices/basic/VElseIf.vue'
import VFor from './components/practices/basic/VFor.vue'
import VHtml from './components/practices/basic/VHtml.vue'
import VMemo from './components/practices/basic/VMemo.vue'
import VOn from './components/practices/basic/VOn.vue'
import VOnce from './components/practices/basic/VOnce.vue'
import VPre from './components/practices/basic/VPre.vue'
import VShow from './components/practices/basic/VShow.vue'
import VText from './components/practices/basic/VText.vue'
import Xss from './components/practices/basic/Xss.vue'
import RefExample from './components/practices/basic/RefExample.vue'
import ReactiveExample from './components/practices/basic/ReactiveExample.vue'
import ReactiveWatchExample from './components/practices/basic/ReactiveWatchExample.vue'
import ComputedExample from './components/practices/basic/ComputedExample.vue'
import WatchExample from './components/practices/basic/WatchExample.vue'
import WatchEffectExample from './components/practices/basic/WatchEffectExample.vue'
import DeepWatchExample from './components/practices/basic/DeepWatchExample.vue'
import MultiSourceWatchExample from './components/practices/basic/MultiSourceWatchExample.vue'
import AboutView from './views/AboutView.vue'
import WeatherMockup from './components/practices/handson/WeatherMockup.vue'
import WeatherComposition from './components/practices/handson/WeatherComposition.vue'
import WeatherParent from './components/practices/handson/WeatherParent.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'
import StoreCounter from './components/practices/library/StoreCounter.vue'
import SignupFormChallenge from './components/practices/library/SignupFormChallenge.vue'
import ProductQuantityChallenge from './components/practices/library/ProductQuantityChallenge.vue'
import SystemFeedbackChallenge from './components/practices/library/SystemFeedbackChallenge.vue'
import PrettierChallenge from './components/practices/library/PrettierChallenge.vue'
import EnvChallenge from './components/practices/library/EnvChallenge.vue'

// Hands on 4: Weather Router - 요구사항 2: Navigation Bar용 현재 라우트 정보
// (Catch-all/NotFoundView에서는 헤더/탭 내비게이션을 숨기기 위해 route.meta.hideChrome을 확인)
const route = useRoute()
</script>

<template>
  <!-- <h1>Hello Skala-Vue</h1> -->
  <!-- <SampleOne /> -->
  <!-- <SampleTwo /> -->
  <!-- <EventModifier /> -->
  <!-- <EventObject /> -->
  <!-- <VBind /> -->
  <!-- <VBindExample /> -->
  <!-- <VCloak /> -->
  <!-- <VElseIf /> -->
  <!-- <VFor /> -->
  <!-- <VHtml /> -->
  <!-- <VMemo /> -->
  <!-- <VOn /> -->
  <!-- <VOnce /> -->
  <!-- <VPre /> -->
  <!-- <VShow /> -->
  <!-- <VText /> -->
  <!-- <Xss /> -->
  <!-- <RefExample /> -->
  <!-- <ReactiveExample /> -->
  <!-- <ReactiveWatchExample /> -->
  <!-- <ComputedExample /> -->
  <!-- <WatchExample /> -->
  <!-- <WatchEffectExample /> -->
  <!-- <DeepWatchExample /> -->
  <!-- <MultiSourceWatchExample /> -->
  <!-- <AboutView /> -->
  <!-- <WeatherMockup /> -->
  <!-- <WeatherComposition /> -->
  <!-- <WeatherParent /> -->
  <!-- <StoreCounter /> -->
  <!-- <SignupFormChallenge /> -->
  <!-- <ProductQuantityChallenge /> -->
  <!-- <SystemFeedbackChallenge /> -->
  <!-- <PrettierChallenge /> -->
  <!-- <EnvChallenge /> -->

  <!-- Hands on 4: Weather Router - 요구사항 2: Navigation Bar(RouterLink) + 메인 콘텐츠 영역(RouterView) -->
  <header v-if="!route.meta.hideChrome" class="app-header">
    <h2>🎨 Weather UI Library: Element Plus 적용</h2>
    <div class="toolbar">
      <nav class="tab-nav">
        <RouterLink to="/">🏠 날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/favorites">⭐ 즐겨찾기</RouterLink>
      </nav>
      <!-- 요구사항 2: Navigation Bar 옆에 UnitToggler 배치 -->
      <UnitToggler />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Hands on 4: Weather Router - 헤더 + 탭 내비게이션 */
.app-header {
  max-width: 480px;
  margin: 0 auto 1rem;
  text-align: center;
}

.app-header h2 {
  margin-bottom: 0.75rem;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tab-nav {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: #eee;
}

.tab-nav a {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  text-decoration: none;
  color: #555;
  font-size: 0.9rem;
}

/* vue_router는 현재 활성화된 라우트에 router-link-active 클래스를 자동으로 추가해줌 */
.tab-nav a.router-link-active {
  background: #fff;
  color: var(--color-text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}
</style>
