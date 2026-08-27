<!--
  Hands on 5: Weather Store - UnitToggler
  요구사항 (슬라이드 기준)
    1. 대시보드 상단에 배치되어 단위 설정을 변경하는 UI 버튼과 영역
    2. Navigation Bar 옆에 배치 (App.vue에서 사용)
  -> configStore(Pinia)의 unit/unitSymbol/toggleUnit을 그대로 연결만 합니다.
-->
<script setup>
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">
      날씨단위: {{ configStore.unit === 'fahrenheit' ? '화씨' : '섭씨' }}({{ configStore.unitSymbol }})
    </span>
    <button type="button" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.unit-label {
  color: #666;
  white-space: nowrap;
}

.unit-toggler button {
  padding: 0.35rem 0.8rem;
  border: none;
  border-radius: 999px;
  background: #e6483c;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
