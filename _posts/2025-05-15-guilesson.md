---
title: "gui 명령어 모음집"
date: 2025-05-14
categories: [ormi]
---

---

# 🖱 Git GUI 툴 사용법 (입문자용)

---

## 1️⃣ GitHub Desktop 사용법 (공식 툴 – 초보자에게 가장 쉬움)

🔗 [다운로드](https://desktop.github.com/)

### 🔧 기본 기능

| 작업       | 방법                                            |
| -------- | --------------------------------------------- |
| 저장소 클론   | GitHub Desktop → `File > Clone repository` 선택 |
| 변경 사항 확인 | 좌측 메뉴의 "Changes" 탭에서 실시간 변경 확인 가능             |
| 커밋하기     | 메시지 입력 후 `Commit to 브랜치명` 버튼 클릭               |
| 브랜치 전환   | 좌상단 브랜치 선택 드롭다운에서 새 브랜치 생성/전환                 |
| 푸시하기     | 상단의 `Push origin` 버튼 클릭                       |
| 풀 받기     | 상단의 `Pull origin` 버튼 클릭                       |
| PR 만들기   | `Create Pull Request` 버튼 클릭 → GitHub 페이지로 이동됨 |

### ✅ 장점

* 터미널 없이 시각적으로 Git 흐름 학습 가능
* 초보자에게 매우 직관적
* 충돌 발생 시 GitHub에서 자동 가이드 제공

---

## 2️⃣ Sourcetree 사용법 (Atlassian 제작 – GUI 고급자용)

🔗 [다운로드](https://www.sourcetreeapp.com/)

### 🔧 기본 기능

| 작업      | 설명                                             |
| ------- | ---------------------------------------------- |
| 클론      | 상단 "Clone" → URL 붙여넣기                          |
| 브랜치 만들기 | 왼쪽 사이드바 `Branches` → 우클릭 → `New Branch`        |
| 커밋      | `File Status` 탭 → 변경 파일 체크 → 메시지 입력 후 `Commit` |
| 푸시 / 풀  | 상단 Push / Pull 버튼 사용                           |
| 병합      | `Branches`에서 병합할 브랜치 선택 → `Merge` 클릭           |
| 히스토리 보기 | `Log / History` 탭에서 커밋 트리 시각적으로 확인 가능          |

### ✅ 장점

* 시각적으로 브랜치 흐름 파악에 매우 유리
* 복잡한 프로젝트에 적합 (충돌, stash, rebase 등 관리 가능)

---

## 🎯 추천 워크플로우 (GitHub Desktop 기준)

1. **저장소 클론**
   → GitHub Desktop에서 `Clone repository`

2. **브랜치 생성 & 전환**
   → 좌상단 드롭다운에서 `New Branch`

3. **파일 수정 → 변경사항 확인**
   → "Changes" 탭에서 확인 후, 커밋 메시지 입력

4. **커밋**
   → `Commit to 브랜치명`

5. **푸시**
   → `Push origin` 버튼 클릭

6. **PR 생성**
   → `Create Pull Request` 버튼 → GitHub 웹으로 자동 이동

---

## 📝 정리

| GUI 툴              | 특징                      | 추천 대상                    |
| ------------------ | ----------------------- | ------------------------ |
| **GitHub Desktop** | 공식 GitHub GUI, 간단하고 직관적 | Git 입문자, JS 없는 정적 페이지 협업 |
| **Sourcetree**     | 브랜치 트리 시각화 탁월, 고급 기능    | Git 흐름을 더 깊게 이해하고 싶은 사용자 |

---

필요하다면 **“팀원용 GUI 설명서 PDF”** 혹은 **Notion 공유용 문서**도 만들어 드릴 수 있어요.
또는 실습에 쓸 **워크시트형 GUI 체험 미션**도 드릴 수 있고요. 원하시나요?
