<!--
  Code Challenge (Vite Build & Deployment): Prettier
  요구사항: 정렬/인덴트가 엉망인 코드를 작성해서 저장한 뒤 npm run format으로 정리되는 걸 확인

  실제로 저장했던 원본(포맷팅 전):
    const     myRegion    = `Suwon`  ;
    const regionGreeting = `웰컴 투 ${myRegion}`;

  npm run format(prettier --write) 실행 후 결과(아래 script 블록) 확인:
    - 변수명/= 사이의 불규칙한 공백이 한 칸으로 정리됨
    - .prettierrc.json의 semi:false 설정에 따라 문장 끝 세미콜론이 제거됨
    - 문자열 보간이 있는 템플릿 리터럴이라 백틱(`)은 그대로 유지됨
      (참고: singleQuote:true는 일반 문자열 리터럴에만 적용되고, 백틱 템플릿 리터럴은 건드리지 않음)
-->
<script setup>
const myRegion = `Suwon`
const regionGreeting = `웰컴 투 ${myRegion}`
console.log(regionGreeting)
</script>

<template>
  <div class="practice-section">
    <h2>Prettier 포맷팅 실습</h2>
    <p>{{ regionGreeting }}</p>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 360px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
</style>
