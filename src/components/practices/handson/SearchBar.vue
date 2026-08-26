<!--
  Hands on 3: Weather Component - SearchBar
  요구사항 (슬라이드 기준)
    - 부모로부터 검색어(반응형 데이터)를 전달받아 표시 (props)
    - 도시 검색 시 update-query 이벤트를 발생하면서 검색어를 부모에게 전달 (emits)
  -> 자체 상태 없이, 받은 searchQuery를 그대로 보여주고 입력값 변경만 부모로 올려보내는
     "제어 컴포넌트(controlled component)" 형태입니다.
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
      id="citySearch3"
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
