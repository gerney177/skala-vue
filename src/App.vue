<!-- SFC(Single File Component) 3단 구조 
script, template, style로 구성되어 있음 
-->

<!-- main.js에서 호출되는 어플리케이션 루트 Vue 컴포넌트 -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
  <WeatherParent />

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
/* vue_router는 현재 활성화된 라우트에 대해 router-link-exact-active 클래스를 자동으로 추가해줌 */
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
