<!--
  Hands on 4: Weather Router - WeatherCard
  과제 3(components/practices/handson)에서 만든 컴포넌트를 그대로 가져왔습니다.
  click-detail은 이제 WeatherHomeView에서 alert 대신 router.push로 처리됩니다.

  Hands on - Weather UI Library
  날씨 상태는 <el-tag>, 즐겨찾기/상세보기 버튼은 <el-button>으로 교체.
-->
<script setup>
import { Star, StarFilled } from '@element-plus/icons-vue'

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
  <el-card class="weather-card" shadow="hover" @click="$emit('select-card', city)">
    <div class="card-inner">
      <div class="card-info">
        <p class="city-name">
          {{ city.name }} <el-tag size="small" type="info">{{ city.status }}</el-tag>
        </p>
        <p class="city-temp">
          현재 기온:
          <span v-if="city.displayTemp == null">불러오는 중...</span>
          <span v-else>{{ city.displayTemp }}{{ city.unitLabel }}</span>
        </p>
      </div>
      <div class="card-actions">
        <el-button
          circle
          :type="isFavorite ? 'warning' : 'default'"
          :icon="isFavorite ? StarFilled : Star"
          @click.stop="$emit('toggle-favorite', city)"
        />
        <el-button size="small" @click.stop="$emit('click-detail', city)">상세보기</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.card-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
