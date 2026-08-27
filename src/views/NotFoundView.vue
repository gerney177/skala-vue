<!--
  Hands on 4: Weather Router - NotFoundView (Catch-all Route)
  요구사항: 정의되지 않은 경로 접근 시 표시되는 페이지

  Hands on - Weather UI Library
  Element Plus의 <el-result> - 성공/실패/에러 화면을 아이콘과 함께 통째로 그려주는 컴포넌트로 교체.
-->
<script setup></script>

<template>
  <el-result class="not-found" icon="warning" title="페이지를 찾을 수 없습니다." sub-title="요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.">
    <template #extra>
      <RouterLink to="/" custom v-slot="{ navigate }">
        <el-button type="primary" @click="navigate">날씨 메인으로 돌아가기</el-button>
      </RouterLink>
    </template>
  </el-result>
</template>

<style scoped>
.not-found {
  max-width: 420px;
  margin: 3rem auto 0;
}
</style>
