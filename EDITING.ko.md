# 웹사이트 수정 안내

## 글 수정

1. GitHub 저장소의 `content/posts`에서 수정할 글을 연다.
2. 연필 버튼을 누르고 두 번째 `---` 아래의 본문을 수정한다.
3. **Commit changes**로 저장한다. `main`에 저장하면 자동으로 배포된다.
4. 상단 **Actions**에서 초록색 완료 표시를 확인한다. 배포 후에도 예전 화면이면 새로고침한다.

## 새 노트 추가

1. `templates/idea-note.md` 또는 `templates/paper-note.md`를 연 뒤 내용을 복사한다.
2. `content/posts`에서 **Add file → Create new file**을 선택한다.
3. 파일 이름은 `my-new-note.md`처럼 쓰고 템플릿을 붙여넣는다.
4. `title`, `slug`, `summary`와 본문을 수정한다. `slug`는 영문 소문자와 하이픈으로 구성하고 다른 글과 겹치지 않게 한다.
5. **Commit changes**로 저장한다.

메타데이터는 JSON 형식이므로 각 항목 사이의 쉼표와 큰따옴표를 유지한다. 마지막 항목 뒤에는 쉼표를 넣지 않는다. 날짜는 입력하지 않아도 된다.

`aims`에는 관련 연구를 선택한다.

- `design-agents`: Aim 1
- `experimental-agents`: Aim 2
- `learning-agents`: Aim 3

여러 개를 연결하려면 `["design-agents", "learning-agents"]`처럼 입력한다. `related` 항목에 다른 글의 `slug`를 넣으면 관련 노트 링크가 생긴다. `paper`는 `content/publications.json`의 논문 ID와 연결하며 선택 사항이다.

그림은 `assets/notes`에 올리고 본문에 `![설명](/assets/notes/파일명.png)`처럼 넣는다. 공개 저장소이므로 비공개 원고, API 키, 지원 서류는 업로드하지 않는다. `draft: true`도 소스 자체를 숨겨주지는 않는다.

## 소개·논문·디자인 수정

- 논문과 코드 주소: `content/publications.json`
- 이메일과 프로필 주소: `content/site.json`
- 홈과 About 문구: `scripts/templates.mjs`
- 각 Aim 내용: `scripts/aim-pages.mjs`
- 그림과 디자인을 크게 바꾸는 경우 이 폴더를 열고 Codex에 수정을 요청해도 된다.

내용 수정 시 `content/site.json`의 `updated`를 현재 ISO 시각으로 바꾸면 RSS에도 갱신 시점이 반영된다. 개별 노트에는 작성일을 표시하지 않는다.

## 예전 글

예전 블로그 글 27개는 `/archive/`에서 볼 수 있다. 원본은 `_posts/`에 있고 기존 URL도 유지한다. 예전 사이트 전체 상태는 `backup/jekyll-before-research-site-2026-10-24` 브랜치로 보존돼 있다.

## Agent가 읽는 정보

`/llms.txt`는 연구 안내, `/llms-full.txt`는 현재 연구의 전체 텍스트, `/research.json`은 연구·논문·코드·노트 목록이다. 각 페이지에도 `/index.md` 버전이 자동 생성된다. 별도로 수정할 필요 없이 기존 노트와 페이지를 수정하면 모두 함께 갱신된다. 완료한 연구와 미래 목표의 구분도 원래 본문을 따른다.
