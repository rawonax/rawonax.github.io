---
title: "[html/css반 추가교안] cursor에 관하여  
categories: [ormi]
date: 2025-05-12
---

웹 페이지에서 사용자의 마우스 커서가 어떤 형태를 띠는지는 ux에 큰 영향을 준다. 이번 글에서는 css의 `cursor`속성에 대해 기초 개념부터 다양한 커서 종류, 실습 예제까지 다뤄보도록 하겠다.

## ✅ cursor란?

CSS의 `cursor` 속성은 **요소 위에 마우스를 올렸을 때 커서의 모양을 바꾸는 속성**이다

```css
.element {
  cursor: pointer;
}
```

커서를 바꿔주는 것은 단순한 디자인 적 요소라고 생각할 수 있지만 사용자에게 클릭 가능 여부등을 알려주는 중요한 ui 요소이다. 
cursor을 어떻게 사용하느냐에 따라 디테일적 차이가 드러나는 경우가 많다. 

| 속성값           | 의미 및 사용처                   |
| ------------- | -------------------------- |
| `default`     | 기본 화살표 커서                  |
| `pointer`     | 손가락 모양 (버튼, 링크 등 클릭 가능할 때) |
| `text`        | I자 모양 (텍스트 입력 영역)          |
| `move`        | 십자 화살표 (이동 가능 요소)          |
| `grab`        | 손바닥 (드래그 대기 상태)            |
| `grabbing`    | 움켜쥔 손 (드래그 중 상태)           |
| `not-allowed` | 금지 표시 (비활성화된 요소)           |
| `wait`        | 모래시계 또는 로딩 커서              |
| `crosshair`   | 십자선 (정밀 조작)                |
| `zoom-in`     | 확대 가능 UI                   |
| `zoom-out`    | 축소 가능 UI                   |
| `none`        | 커서를 보이지 않게 함               |

 
그럼 지금부터 실습 코드를 다뤄보자. 

```
<h1>커서 실습</h1>
<div class="box default">default</div>
<div class="box pointer">pointer</div>
<div class="box text">text</div>
<div class="box move">move</div>
<div class="box grab">grab</div>
<div class="box not-allowed">not-allowed</div>
```
```
.box {
  display: inline-block;
  width: 120px;
  height: 80px;
  line-height: 80px;
  margin: 10px;
  background-color: #4a90e2;
  color: white;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
}

/* 각각 다른 커서 설정 */
.default { cursor: default; }
.pointer { cursor: pointer; }
.text { cursor: text; }
.move { cursor: move; }
.grab { cursor: grab; }
.not-allowed { cursor: not-allowed; }
```

## 해보면 좋을 실습 과제 
- 커서를 zoom-in, zoom-out, help 등으로 바꿔보며 연습해보자.
- hover 상태에만 커서를 다르게 설정하는 것도 시도해보자.