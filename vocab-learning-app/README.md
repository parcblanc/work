# 영어 단어 학습 앱

구글 스프레드시트의 영어 단어 데이터를 활용한 퀴즈 학습 웹 애플리케이션입니다.

## 기능

- 구글 스프레드시트에서 영어 단어 데이터 자동 로드
- 랜덤 퀴즈 생성 (영어→한글, 한글→영어)
- 한 세션당 10개 문제 제공
- 실시간 정답/오답 피드백
- 점수 기록 및 학습 이력 관리
- 회차별 학습 통계 확인
- 반응형 디자인 (모바일/데스크톱)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 구글 스프레드시트 설정

1. 구글 스프레드시트를 준비합니다
   - 첫 번째 열: 영어 단어
   - 두 번째 열: 한글 뜻

2. 스프레드시트를 공개로 설정합니다
   - 우측 상단 "공유" 버튼 클릭
   - "링크가 있는 모든 사용자"로 변경
   - 권한: "뷰어"

3. 스프레드시트 ID 및 시트 ID를 `src/utils/dataLoader.js`에 입력합니다
   - 스프레드시트 URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=[SHEET_ID]`

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 프로덕션 빌드

```bash
npm run build
```

## 배포

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. GitHub에 레포지토리를 푸시합니다
2. Vercel에서 Import Project
3. 자동으로 빌드 및 배포됩니다

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. GitHub에 레포지토리를 푸시합니다
2. Netlify에서 New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

## 기술 스택

- React 18
- Vite
- PapaParse (CSV 파싱)
- Local Storage (점수 기록)

## 사용 방법

1. **학습 시작**: 홈 화면에서 "학습 시작" 버튼 클릭
2. **퀴즈 풀기**: 영어 또는 한글로 제시된 단어의 뜻 입력
3. **결과 확인**: 10문제 완료 후 점수 및 등급 확인
4. **기록 보기**: 회차별 학습 이력 및 통계 확인

## 라이선스

MIT
