---
title: "[html/css] 키프레임"
date: 2025-05-13
categories: [ormi]
layout: post
---



# ✨ CSS @keyframes 교안 – 살아있는 웹 요소 만들기

## ✅ 오늘의 목표
- CSS 애니메이션의 핵심 문법인 `@keyframes`를 이해한다.
- `animation` 속성과 함께 사용하는 구성요소를 익힌다.
- 실제 예제를 통해 애니메이션을 구현해본다.

---

## 1️⃣ @keyframes란?

`@keyframes`는 CSS 애니메이션의 “시간표”입니다.

- 애니메이션이 **시작부터 끝까지 어떻게 변화할지** 정의합니다.
- 각 시간 지점(%)마다 요소에 적용할 **스타일 상태**를 나열합니다.

```css
@keyframes 이름 {
  0%   { 초기 상태 }
  50%  { 중간 상태 }
  100% { 최종 상태 }
}
````

### 예시

```css
@keyframes fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
```

> 이 애니메이션은 `opacity`가 0에서 1로 변화하며 요소가 **서서히 나타나게** 됩니다.

---

## 2️⃣ animation 속성 구성

요소에 `@keyframes`를 적용하려면, `animation` 속성을 사용합니다.

### 단축 속성 문법

```css
animation: 이름 시간 속도 지연 반복 방향 유지;
```

### 세부 구성 표

| 속성명                         | 예시               | 설명                             |
| --------------------------- | ---------------- | ------------------------------ |
| `animation-name`            | `fadeIn`         | 사용할 @keyframes 이름              |
| `animation-duration`        | `2s`, `500ms`    | 애니메이션의 실행 시간                   |
| `animation-timing-function` | `ease`, `linear` | 시간 흐름 속도 곡선                    |
| `animation-delay`           | `1s`             | 애니메이션 시작까지 대기 시간               |
| `animation-iteration-count` | `1`, `infinite`  | 반복 횟수                          |
| `animation-direction`       | `alternate`      | 반복 방향 (`alternate`, `reverse`) |
| `animation-fill-mode`       | `forwards`       | 애니메이션 종료 후 상태 유지 여부            |

### 예시

```css
.box {
  animation: fadeIn 1.5s ease-out 0s 1 forwards;
}
```

---

## 3️⃣ 실습 예제

### 🎯 목표: 박스를 점점 투명하게 만들기

```html
<div class="box">Fade</div>
```

```css
.box {
  width: 100px;
  height: 100px;
  background: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeOut 2s ease-in-out forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

---

## 4️⃣ 자주 쓰이는 keyframes 유형

| 이름     | 설명          | 주요 속성          |
| ------ | ----------- | -------------- |
| slide  | 좌우로 이동      | `translateX()` |
| bounce | 튕기듯 위아래 이동  | `translateY()` |
| rotate | 회전 애니메이션    | `rotate()`     |
| scale  | 크기 변화 애니메이션 | `scale()`      |
| fade   | 투명도 변화      | `opacity`      |

---

## 5️⃣ transition과 animation의 차이

| 항목       | `transition`       | `animation`                  |
| -------- | ------------------ | ---------------------------- |
| 트리거 방식   | 이벤트 발생 시 (hover 등) | 페이지 로딩 시 자동 실행 가능            |
| 제어 방식    | 시작 → 끝             | 중간 단계 다수 설정 가능               |
| 반복 가능 여부 | ❌ 불가능              | ✅ `infinite`, `alternate` 가능 |
| 핵심 목적    | 상태 전이의 부드러운 연결     | 상태 변화의 시간 흐름을 직접 설계          |

---

## 6️⃣ 실습 과제

> 아래 조건을 만족하는 애니메이션을 구현해보세요:

* 크기가 점점 커졌다가 다시 작아지는 박스를 만들 것
* 1초 동안 `scale(1)` → `scale(1.5)` → `scale(1)`
* 무한 반복, `ease-in-out` 속도 곡선
* 애니메이션 이름은 `growShrink`

---

## ✅ 요약

| 핵심 개념        | 요약                                         |
| ------------ | ------------------------------------------ |
| `@keyframes` | CSS 애니메이션의 시간 축을 정의                        |
| `animation`  | 어떤 애니메이션을 어떻게 실행할지 설정                      |
| 적용 순서        | 1. `@keyframes` 정의 → 2. 요소에 `animation` 적용 |
| 확장 포인트       | JS로 제어하기, 클릭/hover로 트리거 연결, 미디어쿼리 연동 등     |

---


