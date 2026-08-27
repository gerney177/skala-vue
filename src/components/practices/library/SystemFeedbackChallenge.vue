<!--
  Code Challenge (UI Libraries): 실습 3. 시스템 피드백 & 프로그레스 인터랙션
  요구사항 (슬라이드 기준)
    - downloadProgress(0), isDownloading(false)를 반응형 데이터로 정의
    - confirmDelete: ElMessageBox.confirm으로 삭제 여부를 확인 후 ElMessage로 결과 안내
    - startDownload: setInterval로 20씩 증가시키다 100 이상이면 종료 + 완료 메시지
    - <el-card> / <el-button> / <el-progress>로 화면 구성
-->
<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const downloadProgress = ref(0)
const isDownloading = ref(false)

const confirmDelete = () => {
  ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '⚠️ 최종 경고', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('🗑️ 파일이 안전하게 파쇄되었습니다.')
    })
    .catch(() => {
      ElMessage.info('❌ 삭제 작업이 취소되었습니다.')
    })
}

const startDownload = () => {
  if (isDownloading.value) return
  isDownloading.value = true
  downloadProgress.value = 0

  const interval = setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      clearInterval(interval)
      isDownloading.value = false
      ElMessage.success('💾 대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}
</script>

<template>
  <el-card class="challenge-card">
    <template #header>⚙️ 실습 3. 시스템 피드백 & 프로그레스 인터랙션</template>

    <div class="button-row">
      <el-button @click="confirmDelete">🗑️ 서버 파일 삭제 테스트</el-button>
      <el-button type="primary" :disabled="isDownloading" @click="startDownload"> 💾 데이터 동기화 시작 </el-button>
    </div>

    <el-progress :percentage="downloadProgress" :status="downloadProgress >= 100 ? 'success' : ''" />
  </el-card>
</template>

<style scoped>
.challenge-card {
  max-width: 420px;
  margin: 0 auto 1rem;
}

.button-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
</style>
