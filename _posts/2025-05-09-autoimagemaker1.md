---
title: "자동 이미지 교체 자동화 1트 "
categories: [diary]
date: 2025-05-09
---

깃허브 블로그를 쓰다 보면 사진 업로드에 어려움을 겪을 때가 참 많은 것 같다. 사실 어려움보다는 귀찮음이 더 크긴 하다만,,, 그래서 유일한 휴식시간인 점심시간을 반납하고 한시간동안 삽질을 해보았다. 결과는 아직 실패이지만, 밑의 게시물들은 내가 한시간동안 열심히 삽질한 결과이니 참고할 수 있는 부분이 있다면 누가 나 대신 좀 완성시켜줘. 

파이썬은 당연히 핧 줄 알지만 셀레니움은 딸깍딸깍 몇 번 해본게 다여서 온갖 문서들 다 뒤져가면서 트라이를 해보았다. 결국 강의 시간이 다 되어서도 완성하지 못했고...

# 📋 자동 이미지 교체 자동화 1트

## 👩 사용자
Jenna — GitHub Pages 블로그(`rawonax.github.io`) 운영 중이며, 마크다운 기반 일기 및 기록 자동화를 목표로 함.

---

## 🎯 목적

> GitHub 이슈나 첨부에서 생성되는 이미지 링크 (`https://github.com/user-attachments/assets/...`)를  
> **자동으로 다운로드 받고**,  
> **로컬 경로로 치환하여 마크다운(.md) 파일을 수정**하는 과정을 **완전히 자동화**하는 것.

---

## 🔄 시도한 자동화 흐름 (구체적 & 코드 포함)

### ✅ 1단계. 마크다운 파일에서 GitHub 이미지 링크 추출
목표:
![Image](https://github.com/user-attachments/assets/...) 형식의 링크들을 자동으로 탐색한다.

코드:

```python
def extract_github_links(content):
    pattern = r'https://github\.com/user-attachments/assets/[^\s)]+'
    return list(set(re.findall(pattern, content)))
```

---

### ✅ 2단계. GitHub 링크 → 실제 이미지 CDN 주소 
문제:
github.com/user-attachments/... 링크는 실제 이미지가 아님
→ 브라우저에서는 S3 기반 https://github-production-user-asset-... 주소로 자동 리디렉션됨

해결법 (코드):

```python
def resolve_to_cdn_url(github_url):
    try:
        res = requests.get(github_url, allow_redirects=True, timeout=5)
        final_url = res.url
        if "github-logo" in final_url:
            return None  # fallback 로고 URL은 무시
        return final_url
    except Exception as e:
        print(f"❌ 요청 실패: {github_url} → {e}")
        return None
```

---

### ✅ 3단계. 이미지 다운로드 및 저장
디렉토리:
assets/images/

코드:
```python
def download_image(cdn_url):
    filename = os.path.basename(cdn_url.split("?")[0])
    local_path = os.path.join("assets/images", filename)
    if not os.path.exists(local_path):
        res = requests.get(cdn_url, timeout=10)
        if res.status_code == 200:
            with open(local_path, "wb") as f:
                f.write(res.content)
            print(f"📥 저장됨: {filename}")
        else:
            print(f"⚠️ 다운로드 실패 ({res.status_code}): {cdn_url}")
    return f"/assets/images/{filename}"
```

---

### ✅ 4단계. 마크다운 내 링크 자동 치환

```python
def update_markdown(md_path, replacements):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    updated = False
    for github_url, local_path in replacements.items():
        if github_url in content:
            content = content.replace(github_url, local_path)
            updated = True

    if updated:
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 마크다운 수정 완료: {md_path}")
    else:
        print(f"⚠️ 마크다운에 변경 없음: {md_path}")
```
마크다운 파일 내 모든 GitHub 링크가 /assets/images/파일이름 형태로 자동 변환됨
---

### 🧪 메인 실행 흐름

```python
def main(md_file):
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    github_links = extract_github_links(content)
    if not github_links:
        print("📭 GitHub 이미지 링크가 없습니다.")
        return

    replacements = {}
    for link in github_links:
        cdn_url = resolve_to_cdn_url(link)
        if not cdn_url:
            print(f"⚠️ CDN 변환 실패 (GitHub 로고일 가능성 있음): {link}")
            continue
        local_path = download_image(cdn_url)
        replacements[link] = local_path

    update_markdown(md_file, replacements)
```

---

## ✅ 실행 명령

```bash
python3 auto_image_update_final.py _posts/2025-05-09-diary.md
```

---

## 📁 결과 파일 구성 예시

```
assets/
└── images/
    ├── abcdef123.jpeg
_posts/
└── 2025-05-09-diary.md
```

---

## 💬 소감 및 평가

- 스크립트 자체는 완성도 높게 동작함
- GitHub 링크가 만료된 경우 다운로드 실패(404)는 불가피
- 그러나 유효한 CDN 링크만 확보된다면 **완전 자동화 성공**

--- 
