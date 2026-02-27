# 🍅 My Little Pomodoro

***focus, one tomato at a time***

<img width="348" height="600" alt="image" src="https://github.com/user-attachments/assets/09404dfb-5583-415a-a980-c685c922d6f2" />
<img width="674" height="626" alt="image" src="https://github.com/user-attachments/assets/bbe1a041-d3db-4f8e-8c3a-3db2774252e2" />
<img width="694" height="551" alt="image" src="https://github.com/user-attachments/assets/d7c470d8-2d7c-48d9-8ec3-f0908b6aca12" />




- 뽀모도로 기법을 활용해 집중 세션을 관리하고 기록하는 생산성 웹 앱
- 태그로 세션을 분류하고, 30일간의 집중도를 히트맵으로 시각화하는 개인 집중 관리 플랫폼

🙋‍♀️ 개발 인원: 1명

📆 개발 기간: 2026년 2월 16일 ~ 2026년 2월 26일

### 접속 정보
[접속 링크](https://my-little-pomodoro.vercel.app)


## 1. 프로젝트 소개

My Little Pomodoro는 **집중의 단위**를 쌓아가는 뽀모도로 타이머 앱입니다.

단순한 카운트다운이 아니라, 오늘 무엇에 집중했는지를 태그로 분류하고, 그 흐름이 30일간 히트맵으로 쌓여가는 것을 눈으로 확인할 수 있습니다.

작은 토마토를 하나씩 완성해가며 나만의 집중 패턴을 만들어가는 경험을 제공합니다.


## 2. 주요 기능

**🍅 뽀모도로 타이머**
- 집중 / 휴식 / 긴 휴식 단계를 자동으로 전환하며 카운트다운
- 집중 4회 완료 시 긴 휴식으로 자동 전환되는 사이클 관리
- 브라우저 푸시 알림으로 단계 전환 안내

**🏷️ 태그 기반 세션 관리**
- 집중, 공부, 운동 등 사용자 정의 태그로 세션 분류
- 세션 완료 시 태그별 기록 자동 누적

**📊 30일 집중도 통계**
- 날짜별 · 태그별 집중 횟수를 히트맵으로 시각화
- 자정 기준으로 오늘의 데이터가 30일 히스토리로 자동 이전
- 30일 초과 데이터 자동 정리

**⚙️ 타이머 설정**
- 집중 · 휴식 · 긴 휴식 시간을 자유롭게 조정
- 페이지 새로고침 후에도 기록 및 타이머 상태 유지 (로컬 영속성)


## 3. 기술 스택

**💅 Frontend**
- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS
- shadcn/ui
- Sonner

**🛠️ Tooling**
- ESLint / Prettier
- Vercel (배포)


## 4. 설계 포인트

**📦 상태 관리**

Zustand의 `persist` 미들웨어를 활용해 관심사별로 스토어를 분리했습니다.

- `pomodoro-status` — 현재 타이머 단계 · 경과 시간 · 실행 여부
- `pomodoro-history` — 오늘의 완료 세션 + 30일 일자별 태그 집계
- `pomodoro-settings` — 집중 · 휴식 시간 설정 · 선택된 태그
- `tag` — 사용자 정의 태그 목록

**🔄 뽀모도로 사이클 설계**

집중 4회 완료 시 긴 휴식으로 전환되며, 완료된 세션은 자동으로 날짜별 기록에 누적됩니다.
자정을 기점으로 오늘의 데이터가 30일 히스토리로 이전되고, 30일 초과 데이터는 자동 정리됩니다.

## 5. 폴더 구조

```
src/
├── 📂pages          # 페이지 컴포넌트 (타이머 / 통계 / 설정)
├── 📂components     # UI 컴포넌트 (타이머, 모달, 레이아웃 등)
├── 📂stores         # Zustand 전역 상태 (타이머 상태 · 기록 · 설정 · 태그)
├── 📂lib            # 유틸 함수 · 상수 · 네비게이션
├── 📂providers      # 모달 컨텍스트 프로바이더
└── types.tsx        # 공통 타입 정의
```


## 6. 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```
