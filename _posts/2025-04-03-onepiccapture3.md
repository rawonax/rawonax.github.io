---
title: "사진 한 장으로 아이피 추적하기3 - 아이피를 분석해보자"
categories: [security]
tags:
  - ects
date: 2025-04-03
---
---
## **🔥 1. VPN 사용 여부 확인**

VPN을 사용하는 사람들은 일반적으로 **일반적인 인터넷 사용자와 다른 특징**을 가지고 있어, 우선  상대방이 VPN을 사용하고 있는지 확인하는 것이 중요함

### **✅ 방법 1: IP 주소 분석 (Whois & ISP 체크)**

- **IP 추적 사이트**(`https://www.iplocation.net/` 등)를 이용해서 상대의 IP를 조회하면 VPN 여부를 알 수 있음.
- 일반적인 인터넷 사용자와 다른 **ISP(인터넷 서비스 제공업체)가 표시되면 VPN 사용 가능성이 높음.**
- 예:
    - ISP가 **NordVPN, ExpressVPN, Mullvad VPN**처럼 표시됨 → VPN 사용 중
    - IP 주소가 **데이터 센터 (AWS, DigitalOcean, Google Cloud)에서 나온 경우** → VPN 가능성 높음

🔹 **Whois 조회 방법:**

1. `https://who.is/` 에서 상대방의 IP를 입력
2. 결과에서 **ISP 정보**를 확인
3. **AWS, Google Cloud, OVH, DigitalOcean 같은 클라우드 서버 업체라면 VPN일 가능성이 큼**

---

## **🔥 2. VPN 뒤에 숨은 실제 위치 찾기**

### **✅ 방법 2: VPN 우회하여 실제 IP 추출**

VPN을 사용해도 몇 가지 기법을 활용하면 실제 IP를 찾아낼 수 있다.

### **▶ 방법 2-1: WebRTC + VPN Leak 테스트**

일부 VPN은 **WebRTC Leak(웹 브라우저의 WebRTC 기능을 통한 IP 누출)** 문제가 있음.

WebRTC 요청을 반복해서 보내서 VPN을 우회할 수 있음.

✅ **단계별 진행법**

1. WebRTC 추적 사이트(`https://browserleaks.com/webrtc`)에 방문
2. 상대방이 **VPN 사용 중이라도 WebRTC Leak이 발생할 수 있음**
3. WebRTC에서 **내부 네트워크 IP**가 노출될 경우, VPN을 우회하고 실제 네트워크를 확인할 수 있음.

💡 **한계점**:

- 모든 VPN이 WebRTC Leak을 발생시키지는 않음.
- 상대방이 브라우저 보안 설정을 강화하면 차단될 수도 있음.

---

### **✅ 방법 3: VPN이 아닌 실제 네트워크를 강제로 사용하게 유도**

일반적으로 사용자는 VPN을 켜더라도 **일부 트래픽은 VPN을 사용하지 않는 경우가 있음.**

이 점을 활용해서 VPN을 우회하는 방법이 있음.

### **▶ 방법 3-1: 이미지 기반 트래픽 우회 (Dual Stack Leak)**

VPN을 사용 중이어도 일부 사용자는 **이미지 로딩 요청을 직접 실행**하게 되는데, 이 과정에서 VPN이 아닌 실제 IP가 노출될 수 있음.

**✅ 진행 방법**

1. 이미지 파일을 상대방에게 전송 (`image.jpg`)
2. 이미지를 로드하는 순간, `image.jpg`를 직접 로드하지 않고 **서버 스크립트**(`image.php`)를 사용하여 요청을 받음
3. `image.php`에서 상대의 **VPN이 아닌 실제 IP**를 기록함

💡 **스크립트 예제 (PHP)**

```php
<?php
$ip = $_SERVER['REMOTE_ADDR'];
$file = 'log.txt';
file_put_contents($file, $ip . "\n", FILE_APPEND);
header("Content-Type: image/jpeg");
readfile("real_image.jpg");
?>

```

✅ **설명**:

- 상대방이 이미지를 로드하면, VPN이 아닌 실제 IP가 서버에 기록될 가능성이 있음.
- 일부 VPN은 **이미지 로딩 시 VPN을 거치지 않도록 설정되기도 함**.

<aside>
💡

결론 : 이미지 기반 트래픽 우회로 진행해야함

</aside>