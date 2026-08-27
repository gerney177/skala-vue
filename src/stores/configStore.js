// Hands on 5: Weather Store - 날씨 단위를 세팅하는 전역 설정 스토어
// 요구사항 (슬라이드 기준)
//   state:   unit       - 단위를 저장하는 변수 (초기값: celsius)
//   getters: unitSymbol - 현재 단위 상태에 맞는 기호 (°C / °F)
//   actions: toggleUnit - 'celsius'와 'fahrenheit'를 토글(스위칭)하는 함수
//   + 요구사항 4: 본인만의 추가 state/getter/action - 풍속 단위(m/s ↔ mph) 토글
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // ===== 온도 단위 =====
  const unit = ref('celsius')

  const unitSymbol = computed(() => (unit.value === 'fahrenheit' ? '°F' : '°C'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  // ===== 요구사항 4: 추가 state/getter/action - 풍속 단위 =====
  const windUnit = ref('ms') // 'ms' | 'mph'

  const windUnitLabel = computed(() => (windUnit.value === 'mph' ? 'mph' : 'm/s'))

  function toggleWindUnit() {
    windUnit.value = windUnit.value === 'ms' ? 'mph' : 'ms'
  }

  return { unit, unitSymbol, toggleUnit, windUnit, windUnitLabel, toggleWindUnit }
})
