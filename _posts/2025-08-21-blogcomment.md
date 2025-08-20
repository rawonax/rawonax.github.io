---
title: "블로그에 Giscus 댓글창 달기"
categories: [diary]
date: 2025-08-21
---
jekyll을 사용하면서 항상 미뤄왔던 기능. 바로 댓글창 추가하기. 어차피 댓글창에 댓글 남기실 분들도 얼마 없는건 아는데 그래도 하나 만들어두고 싶었다. 예전 블로그에서는 disqus를 사용했는데 disqus는 유료로 사용해야 하거나 광고를 봐야 한다는 단점이 있어서 github를 기반으로 한 댓글 시스템인 giscus를 사용하여 댓글창을 삽입해보기로 했다. 무료니까 ~ 
[![2025-08-21-6-11-29](https://i.ibb.co/FbzH3hgN/2025-08-21-6-11-29.png)](https://ibb.co/xS6FL2JP)


### [gisqus 공홈 바로가기](https://giscus.app/ko)


# 1. config.yml 설정하기 

```
comments:
  provider: "giscus"
  giscus:
    repo: "사용자명/저장소명"
    repo_id: "..."
    category: "General"
    category_id: "..."
    mapping: "pathname"
    reactions_enabled: "1"
    theme: "light"
```

먼저 congfig.yml을 수정해준다. 

여기서는 대충 일부만 수정해준다. 모르겠는 항목은 뒤에 가서 채워넣게 될 거니 일단 어떤 모양으로 생겼는지 알아보고 패스. 


# 2. github 저장소 세팅하기 
username/username.github.io 같은 레파지토리로 들어가주고 settings 탭에서 features를 찾아 discussions을 체크해줘야 한다. 

[![2025-08-21-6-17-29](https://i.ibb.co/m55v4bpb/2025-08-21-6-17-29.png)](https://ibb.co/HTTNqBZB)


# 3. 공홈 설정하기 
[![2025-08-21-6-21-51](https://i.ibb.co/DDk9dQwT/2025-08-21-6-21-51.png)](https://ibb.co/Lz6xK19H)

여기서 열심히 설정을 해주면 되는데, 각 설정값마다 조금씩 다른점이 있다. 지금부터 쭉 설명해볼거니 본인 입맛에 맞는 설정으로 진행하면 된다. 

각 옵션의 의미

경로(pathname)
→ https://example.com/posts/abc/ 라면 /posts/abc/ 기준으로 Discussion을 연결
→ 보통 블로그 글은 경로가 고유하기 때문에 가장 안정적인 선택

URL
→ 전체 URL(https://example.com/posts/abc/) 기준
→ 도메인을 바꾸거나 HTTPS → HTTP 변경 시 문제가 생길 수 있음

페이지 `<title>`
→ `<title>` 태그(예: "내 글 제목")로 연결
→ 글 제목이 바뀌면 Discussion이 끊길 수 있음

og:title
→ SNS 공유용 메타 태그(og:title) 기준
→ 역시 제목 변경 시 문제 발생 가능

특정 단어 포함
→ 전혀 추천 X (모든 글이 같은 Discussion에 몰릴 수 있음)

Discussion 번호 지정
→ 글마다 수동으로 번호 넣어야 해서 블로그엔 부적합

필자가 가장 헷갈렸던 항목은
```
Discussion 카테고리 새 Discussion이 만들어질 카테고리를 선택하세요. giscus와 관리자만이 새 Discussion을 만들 수 있도록 Announcements 유형의 카테고리를 선택하는 것을 권장합니다. Discussion 카테고리 카테고리 선택 이 카테고리에서만 Discussion 찾기 giscus에서 조건을 만족하는 Discussion을 찾을 때 이 카테고리에서만 찾습니다.
```
이 항목이였는데, 풀이하자면 이와 같다. 얘는 카테고리 단위로 나뉘어서 giscus가 댓글을 달려고 할때 해당 카테고리 안에서 "이 페이지와 연결된 discussion이 이미 있는지를 찾고 없으면 새 discussion 을 만들어서 그 카테고리에 넣는 방식이다 

Giscus 댓글이 저장될 카테고리를 선택하는 것.
→ “General” 같은 일반 카테고리를 보통 씀.

이 카테리에서만 Discussion 찾기
→ 체크하면, Giscus는 다른 카테고리는 무시하고 선택한 카테고리 안에서만 매칭을 시도.
→ 체크 안 하면, 저장소 전체 Discussion에서 검색.

### 그래서 내 설정은

새로 “Comments” 같은 카테고리를 하나 만들어 두는 게 가장 깔끔해보여서 그렇게 진행했다

Type: Announcements로 설정하는 걸 권장 (Giscus 문서에서도 추천하는 방향이다) 
→ 이렇게 하면 관리자와 giscus 앱만 Discussion을 생성할 수 있어서 스팸이나 사용자의 불필요한 Discussion 생성을 막을 수 있얶ㅆ다.

_config.yml에는 그 카테고리 이름/ID를 넣어주면 된다.

# 마무리 
자 이제 마지막으로 공홈에 코드 뭉태기 하나가 있을텐데, 개를 잘 가공하여 config.yml에 넣어주면 끝난다. 

[![2025-08-21-6-28-52](https://i.ibb.co/C3sXzXHp/2025-08-21-6-28-52.png)](https://ibb.co/ycBMXMQm)


드디어 블로그에 댓글창이 생겼다 ~ 다음번에는 블로그 일일 방문자수 카운트를 한번 해보려고 한다. 

