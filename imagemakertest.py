import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import subprocess

# 테스트할 GitHub 이미지 링크
github_image_urls = [
    "https://github.com/user-attachments/assets/14055cc7-0102-49c3-902b-5d62ced65c9e",
    "https://github.com/user-attachments/assets/c9b59d4a-9964-4d5d-aa2f-a0822da024a5",
    "https://github.com/user-attachments/assets/30d18332-ba80-4930-a445-99c3bdc8b98a",
    "https://github.com/user-attachments/assets/faf199f5-f18c-41b3-962e-bc1fe8e156b4",
    "https://github.com/user-attachments/assets/9c4d313a-4e64-446c-9d1c-b0fc8be546ac",
    "https://github.com/user-attachments/assets/74df2e1c-eb48-49c6-96a5-cf54fb76adc0",
    "https://github.com/user-attachments/assets/c9378438-61fa-480e-a68b-d8fdbe76092b",
]

IMG_DIR = 'assets/images'
os.makedirs(IMG_DIR, exist_ok=True)

options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--log-level=3')

service = Service(
    executable_path="/opt/homebrew/bin/chromedriver",  # 환경에 맞게 수정
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL
)

driver = webdriver.Chrome(service=service, options=options)

for github_url in github_image_urls:
    print(f"🌐 접속: {github_url}")
    try:
        driver.get(github_url)
        time.sleep(2)

        # <meta property="og:image">에서 실제 CDN 주소 추출
        meta_tag = driver.find_element(By.XPATH, '//meta[@property="og:image"]')
        cdn_url = meta_tag.get_attribute("content")
        if not cdn_url:
            print("❌ CDN 링크 추출 실패")
            continue

        filename = os.path.basename(cdn_url.split("?")[0])
        local_path = os.path.join(IMG_DIR, filename)

        res = requests.get(cdn_url)
        if res.status_code == 200:
            with open(local_path, 'wb') as f:
                f.write(res.content)
            print(f"✅ 저장 완료: {local_path}")
        else:
            print(f"❌ 다운로드 실패: {cdn_url}")

    except Exception as e:
        print(f"❌ 예외 발생: {e}")

driver.quit()
print("\n🎉 모든 이미지 저장 완료!")
