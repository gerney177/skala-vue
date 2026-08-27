// Vite Build & Deployment - ESLint 설정
// 슬라이드 예제(defineConfig + globalIgnores + languageOptions + skipFormatting) 구조를 그대로 따릅니다.
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // 기존 ESLint보다 최대 50~100배 빠른 초고속 린터 엔진(Oxlint)을 JavaScript 설정과 동기화
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // Code Challenge - ESLint: Custom Rules
  {
    name: 'app/custom-rules',
    rules: {
      'no-unused-vars': 'warn', // 선언 후 사용하지 않은 변수는 경고 처리
      'no-console': 'off', // 개발 편의를 위해 console.log 허용
      'vue/multi-word-component-names': 'off', // 단일 단어로 된 컴포넌트명 허용
      eqeqeq: ['error', 'always'], // 엄격한 비교 연산자(===) 사용을 강제
    },
  },

  // 줄바꿈, 따옴표, 들여쓰기 등 '시각적 스타일' 규칙들은 ESLint에서 Off하고 Prettier에 전권을 위임
  skipFormatting,
])
