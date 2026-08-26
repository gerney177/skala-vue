<!--
  Hands on 3: Weather Component - WeatherCard
  요구사항 (슬라이드 기준)
    - 선택된 도시 객체를 전달받아 표시 (props)
    - 카드를 선택하는 것(select-card 이벤트)과 상세보기(click-detail 이벤트)를 부모에게 전달 (emits)
  -> 즐겨찾기(⭐) 토글도 카드 단위 UI라서 함께 옮기고, toggle-favorite 이벤트로 부모에게 위임합니다.
     (Weather Composition에서 추가했던 기능이므로 "기능 변경 없이" 그대로 유지)
-->
<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select-card', 'click-detail', 'toggle-favorite'])
</script>

<template>
  <div class="weather-card" @click="$emit('select-card', city)">
    <div class="card-info">
      <p class="city-name">{{ city.name }} ({{ city.status }})</p>
      <p class="city-temp">현재 기온: {{ city.displayTemp }}{{ city.unitLabel }}</p>
    </div>
    <div class="card-actions">
      <button type="button" class="star-btn" @click.stop="$emit('toggle-favorite', city)">
        {{ isFavorite ? '⭐' : '☆' }}
      </button>
      <button type="button" @click.stop="$emit('click-detail', city)">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-btn {
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0;
}
</style>
