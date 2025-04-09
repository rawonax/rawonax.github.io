---
title: "FRONTEND"                    # 페이지 제목
layout: category                      # Minimal Mistakes에서 카테고리나 태그 목록 페이지에 쓰는 레이아웃
permalink: /categories/frontend/     # 이 페이지의 URL 경로
taxonomy: category                   # 해당 페이지가 어떤 taxonomy (카테고리/태그)를 필터링할지 설정
entries_layout: list                 # 각 항목을 나열할 때 사용할 레이아웃 (list, grid 등)
sidebar:
  nav: "main" 
category: frontend                          # `_data/navigation.yml`의 "main" 네비게이션 메뉴 사용
---
{% include category-list.html %}