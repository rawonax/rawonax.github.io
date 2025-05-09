import os
import re
import requests

IMG_DIR = "assets/images"
os.makedirs(IMG_DIR, exist_ok=True)

def extract_github_links(content):
    pattern = r'https://github\.com/user-attachments/assets/[^\s)]+'
    return list(set(re.findall(pattern, content)))

def resolve_to_cdn_url(github_url):
    try:
        res = requests.get(github_url, allow_redirects=True, timeout=5)
        final_url = res.url
        if "github-logo" in final_url:
            return None
        return final_url
    except Exception as e:
        print(f"❌ 요청 실패: {github_url} → {e}")
        return None

def download_image(cdn_url):
    filename = os.path.basename(cdn_url.split("?")[0])
    local_path = os.path.join(IMG_DIR, filename)
    if not os.path.exists(local_path):
        res = requests.get(cdn_url, timeout=10)
        if res.status_code == 200:
            with open(local_path, "wb") as f:
                f.write(res.content)
            print(f"📥 저장됨: {filename}")
        else:
            print(f"⚠️ 다운로드 실패 ({res.status_code}): {cdn_url}")
    return f"/assets/images/{filename}"

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
        print(f"\n✅ 마크다운 수정 완료: {md_path}")
    else:
        print(f"\n⚠️ 마크다운에 변경 없음: {md_path}")

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

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("❗ 사용법: python3 auto_image_update_final.py <markdown_file>")
    else:
        main(sys.argv[1])
