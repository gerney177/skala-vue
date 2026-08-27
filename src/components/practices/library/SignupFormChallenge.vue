<!--
  Code Challenge (UI Libraries): 실습 1. 회원가입 Form & 인풋 제어
  요구사항 (슬라이드 기준)
    - userForm 객체(email, agree)를 반응형 데이터로 정의
    - handleRegister에서 이메일 형식/약관 동의 여부를 검증하고 ElMessage로 안내
    - <el-card> / <el-input> / <el-switch> / <el-button>으로 화면 구성
-->
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <el-card class="challenge-card">
    <template #header>📝 실습 1. 회원가입 Form & 인풋 제어</template>

    <div class="form-row">
      <span class="form-label">이메일 주소:</span>
      <el-input v-model="userForm.email" placeholder="example@email.com" clearable />
    </div>

    <div class="form-row">
      <el-switch v-model="userForm.agree" />
      <span>개인정보 수집 및 필수 이용약관에 동의합니다.</span>
    </div>

    <el-button type="success" style="width: 100%" @click="handleRegister"> 🚀 회원가입하기 </el-button>
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
  width: 80px;
}
</style>
