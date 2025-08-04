---
layout: default
title: "외주 문의하기"
permalink: /contact/
---
<!-- 외주 문의하기 버튼 -->
<button id="freelance-btn" class="btn btn--primary">외주 문의하기</button>

<!-- 외주 문의하기 모달 -->
<div id="freelance-modal" class="freelance-modal">
  <div class="freelance-modal-content">
    <span class="freelance-close">&times;</span>
    <h2>💼 외주 문의하기</h2>
    <form action="mailto:your@email.com" method="POST" enctype="text/plain">
      <label for="name">이름</label>
      <input type="text" id="name" name="name" required>

      <label for="email">이메일</label>
      <input type="email" id="email" name="email" required>

      <label for="desc">프로젝트 내용</label>
      <textarea id="desc" name="desc" rows="5" required></textarea>

      <button type="submit" class="btn btn--inverse">보내기</button>
    </form>
  </div>
</div>

<style>
/* 모달 전체 레이어 */
.freelance-modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
}

/* 모달 창 */
.freelance-modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  font-family: 'Pretendard', sans-serif;
}

.freelance-modal-content h2 {
  margin-top: 0;
  font-size: 1.5rem;
  text-align: center;
}

.freelance-modal-content label {
  display: block;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.freelance-modal-content input,
.freelance-modal-content textarea {
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.freelance-modal-content button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.freelance-modal-content button:hover {
  background-color: #222;
}

.freelance-close {
  float: right;
  font-size: 1.8rem;
  cursor: pointer;
}
</style>

<script>
document.getElementById('freelance-btn').addEventListener('click', function () {
  document.getElementById('freelance-modal').style.display = 'block';
});

document.querySelector('.freelance-close').addEventListener('click', function () {
  document.getElementById('freelance-modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target === document.getElementById('freelance-modal')) {
    document.getElementById('freelance-modal').style.display = 'none';
  }
});
</script>