<!--
  Hands on 4: Weather Router - SearchBar
  과제 3(components/practices/handson)에서 만든 컴포넌트를 그대로 가져왔습니다.
-->
<script setup>
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
    <input
      id="citySearch4"
      type="text"
      placeholder="검색할 도시 이름 입력"
      aria-label="도시 검색"
      :value="searchQuery"
      @input="$emit('update-query', $event.target.value)"
    />
    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>

<style scoped>
.search-bar input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
}
</style>
