<!--
  Hands on - Weather UI Library
  기본 <input>을 Element Plus <el-input>으로 교체 (검색 아이콘 + 지우기 버튼 내장).
  props/emit 계약은 그대로라서 SearchBar를 쓰는 쪽(WeatherHomeView)은 수정할 필요가 없습니다.
-->
<script setup>
import { Search } from '@element-plus/icons-vue'

defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

defineEmits(['update-query'])
</script>

<template>
  <div class="search-bar">
    <el-input
      :model-value="searchQuery"
      placeholder="검색할 도시 이름 입력"
      aria-label="도시 검색"
      clearable
      :prefix-icon="Search"
      @update:model-value="$emit('update-query', $event)"
    />
    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>
