<!--
  Code Challenge (UI Libraries): 실습 2. 커머스 상품 수량 및 평점 시스템
  요구사항 (슬라이드 기준)
    - productQuantity(기본값 1), productRate(기본값 4, 별 4개)를 반응형 데이터로 정의
    - <el-card> / <el-input-number>로 구매 수량을 조절
    - (슬라이드 목업의 별점 표시를 위해 <el-rate>도 함께 사용)
-->
<script setup>
import { ref } from 'vue'

const productQuantity = ref(1) // 수량 카운터 기본값
const productRate = ref(4) // 별점 기본값 (별 4개)
</script>

<template>
  <el-card class="challenge-card">
    <template #header>🛒 실습 2. 커머스 상품 수량 및 평점 시스템</template>

    <div class="form-row">
      <span class="form-label">구매 수량 선택:</span>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
      <span class="hint">(최대 10개 구매 가능)</span>
    </div>

    <div class="form-row">
      <span class="form-label">상품 만족도 별점:</span>
      <el-rate v-model="productRate" />
      <span class="hint">{{ productRate }} 점</span>
    </div>

    <el-card shadow="never" class="summary-card"> 🟢 실시간 장부 요약: 선택 수량 {{ productQuantity }}개 / 내가 준 점수 {{ productRate }}점 </el-card>
  </el-card>
</template>

<style scoped>
.challenge-card {
  max-width: 420px;
  margin: 0 auto 1rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.form-label {
  flex-shrink: 0;
  width: 110px;
}

.hint {
  color: #888;
  font-size: 0.85rem;
}

.summary-card {
  background: #f5fbf6;
}
</style>
