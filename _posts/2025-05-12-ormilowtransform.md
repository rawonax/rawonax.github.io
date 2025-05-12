---
title: "[html/css] transform과 transition으로 살아있는 UI 만들기"
date: 2025-05-12
categories: [ormi]
---

## ✨ 오늘 수업 요약: transform + transition

오늘 수업에서는 웹 UI에 생명력을 불어넣는 두 가지 핵심 속성,  
`transform`과 `transition`에 대해 다뤄보고자 한다. 

처음에는 단순한 네모 상자였던 요소들이  
어느새 호버하면 **커지고**, **돌고**, **떠오르고**, **기울어지며**,  
사용자에게 자연스럽게 반응하는 **"살아있는 UI"** 가 되는 것이 흥미로울 수 있도록 수업을 구성해 보았다. 


---

## 1. transform – 형태를 바꾸는 마법

```css
transform: scale(1.2) rotate(5deg) translateY(-10px) skewX(15deg);
```

transform은 요소의 크기, 회전, 위치, 기울기 등을 바꿔주는 속성이다. 중요한 점은 
>요소의 실제 레이아웃은 그대로인데 시각적인 변형만 일어난다는 것이다. 

- scale() : 요소를 키우거나 줄임
- rotate() : 회전
- translate() : 이동
- skew() : 왜곡 (기울이기)

## 2. transition – 움직임을 부드럽게 연결
```
transition: all 0.3s ease-in-out;
```
transition은 요소의 속성이 바뀔 때 부드럽게 이어주는 역할을 한다.
단순히 hover 했을 때 색이 바뀌는 게 아니라,
"점점 바뀌는" 느낌을 주는 것이다.


> "애니메이션은 없지만, 애니메이션처럼 보이게 해주는 속성."


# 수업 중 실습

먼저 네 개의 똑같은 박스를 만든 후 스타일을 적용시켜 하나하나 반응을 찾아보았다. 

<a href="https://ibb.co/HTDy3DMw"><img src="https://i.ibb.co/s9v4zvDx/2025-05-12-10-10-54.png" alt="2025-05-12-10-10-54" border="0"></a>

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>transform 비교 실습</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class= "box-container">
        <div class="box scale">스케일 박스</div>
        <div class="box rotate">로테이트 박스</div>
        <div class="box translate">트렌스레이트 박스</div>
        <div class="box skew">스큐 박스</div>
    </div>
</body>
</html>
```

```

body {
    font-family: sans-serif;
    background-color: #f9f9f9;
    padding: 40px;
    text-align: center;
  }

  h1 {
    margin-bottom: 30px;
  }
  
  .box-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }

  .box {
    width:120px;
    height:120px;
    background-color: #4a98e2;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-weight: bold;
    cursor:pointer;
  }


  .scale:hover {
    transform : scale(1.2);
  }

  .rotate:hover {
    transform : rotate(20deg);
  }

  .translate:hover{
    transform : translate(-20px);
  }

  .skew:hover {
    transform: skewX(30deg);
  }
```
하나하나 효과를 눈으로 보면서 강의하는 방식이 좀 더 효율적이다는 점을 깨달았다. 
수강생들의 이해도도 좀 더 높아 보였다. 


# 응용 과제 
실습 과제: 비밀 카드 메시지 만들기
화면에 가로로 4장의 카드를 정렬하세요.
각 카드는 동일한 디자인으로 구성하고, 마우스를 올렸을 때 다음의 변형 효과 4가지가 동시에 적용되도록 만드세요:

카드의 크기를 110%로 키우세요.
카드를 시계 방향으로 5도 회전시키세요.
카드를 위쪽으로 10픽셀 이동시키세요.
카드를 수평 방향으로 20도 기울이세요.

변형은 모두 부드럽게 전환되도록 설정하세요.
변형이 적용되었다가, 마우스를 떼면 다시 원래 상태로 자연스럽게 돌아오도록 만들어야 합니다.

챌린지
카드를 클릭했을 때, 앞면이 사라지고 뒷면의 비밀 메시지가 나타나는 효과를 구현해보세요.
예: "HELLO" → "Nice to meet you", "SECRET" → "Don't tell anyone" 등
전환 효과는 자유롭게 구성하되, 사용자의 클릭에 반응하는 형태로 만들어보세요.


```
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>비밀 카드 게임</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>:black_joker: 비밀 카드에 마우스를 올려보세요</h1>
  <div class="card-container">
    <div class="card">HELLO</div>
    <div class="card">SECRET</div>
    <div class="card">CLICK</div>
    <div class="card">WOW</div>
  </div>
</body>
</html>
```


## 문제 해설

```
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>비밀 카드 게임</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>🃏 비밀 카드에 마우스를 올려보세요</h1>
  <div class="card-container">
    <div class="card-wrapper">
      <input type="checkbox" id="card1" />
      <label for="card1">
        <div class="card">
          <div class="card-face card-front">HELLO</div>
          <div class="card-face card-back">Nice to meet you</div>
        </div>
      </label>
    </div>

    <div class="card-wrapper">
      <input type="checkbox" id="card2" />
      <label for="card2">
        <div class="card">
          <div class="card-face card-front">SECRET</div>
          <div class="card-face card-back">Don't tell anyone</div>
        </div>
      </label>
    </div>

    <div class="card-wrapper">
      <input type="checkbox" id="card3" />
      <label for="card3">
        <div class="card">
          <div class="card-face card-front">CLICK</div>
          <div class="card-face card-back">Gotcha!</div>
        </div>
      </label>
    </div>

    <div class="card-wrapper">
      <input type="checkbox" id="card4" />
      <label for="card4">
        <div class="card">
          <div class="card-face card-front">WOW</div>
          <div class="card-face card-back">Amazing!</div>
        </div>
      </label>
    </div>
  </div>
</body>
</html>
```

```
body {
  font-family: sans-serif;
  background: #f0f0f0;
  text-align: center;
  padding: 40px;
}

h1 {
  margin-bottom: 30px;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.card-wrapper {
  perspective: 1000px;
}

.card {
  width: 150px;
  height: 200px;
  position: relative;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.card-front {
  background: #333;
}

.card-back {
  background: #f06292;
  transform: rotateY(180deg);
}

.card-wrapper input[type="checkbox"] {
  display: none;
}

.card-wrapper label {
  display: block;
  width: 150px;
  height: 200px;
}

.card-wrapper input:checked + label .card {
  transform: rotateY(180deg);
}

.card:hover {
  transform: scale(1.1) rotate(5deg) translateY(-10px) skewX(20deg);
}
```

# 꿀팁 !이렇게 써도 돼요 !

```
.card:hover {
  transform: scale(1.1) rotate(5deg) translateY(-10px) skewX(20deg);
}

```

한번에 몰아 써도 된답니다!