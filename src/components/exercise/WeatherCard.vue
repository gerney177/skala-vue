<!--
  Hands on 4: Weather Router - WeatherCard
  과제 3(components/practices/handson)에서 만든 컴포넌트를 그대로 가져왔습니다.
  click-detail은 이제 WeatherHomeView에서 alert 대신 router.push로 처리됩니다.
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
