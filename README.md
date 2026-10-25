# Jeonghyeon Kim · Research & Writing

Personal research website: **https://jasonkim8652.github.io/**

Biologically informed protein models, scientific agents, and learning from experiments.

## Edit a note in your browser

1. Open [`content/posts`](https://github.com/jasonkim8652/jasonkim8652.github.io/tree/main/content/posts).
2. Select a Markdown file, click the pencil, and edit the text below the second `---` line.
3. Click **Commit changes**. Committing to `main` automatically builds, checks, and deploys the website.
4. See progress under [Actions](https://github.com/jasonkim8652/jasonkim8652.github.io/actions/workflows/pages.yml).

To add a note, copy [`templates/idea-note.md`](templates/idea-note.md) or [`templates/paper-note.md`](templates/paper-note.md), then use **Add file → Create new file** in `content/posts`. Choose a unique lowercase `slug` with hyphens; it becomes `/writing/your-slug/`. Notes do not display authorship dates.

Optional metadata:

- `aims`: any of `design-agents`, `experimental-agents`, `learning-agents`.
- `related`: the slug of another note, for a related-note link.
- `paper`: an ID from `content/publications.json`, to show its paper/code links.
- `draft`: `true` excludes the page from the published website. The source is still visible in this public repository; keep private drafts elsewhere.

Upload note illustrations to `assets/notes/` and reference them as `![Descriptive caption](/assets/notes/image.png)`.

## Where content lives

| Change | File |
| --- | --- |
| Notes | `content/posts/*.md` |
| Papers and code links | `content/publications.json` |
| Contact and profile links | `content/site.json` |
| Home, About, Writing layouts | `scripts/templates.mjs` |
| Aim pages | `scripts/aim-pages.mjs` |
| Overview / research illustrations | `scripts/research-map.mjs`, `scripts/research-illustrations.mjs` |
| Styles | `assets/style.css` |
| Portrait | `assets/profile.jpg` |

When updating content, set `content/site.json` → `updated` to the current ISO timestamp. This controls the feed/site update time, not a note's claimed writing date.

## Local preview

Requires Node.js 22 or later.

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm run preview
```

Open the local address printed by the preview command. Re-run the build after edits.

## Hosting

GitHub Pages uses the **GitHub Actions** publishing source. The workflow builds a public release, validates local links at both the site root and a repository subpath, and deploys `dist/`. No database, paid hosting, or server credentials are required.

The previous Jekyll blog's 27 reading notes remain in `_posts/`, with their original images and case-sensitive URLs. Find them at [`/archive/`](https://jasonkim8652.github.io/archive/). Original theme files and commit history are retained; they are not used to build the current site. The previous main branch is also preserved as `backup/jekyll-before-research-site-2026-10-24`.

[한국어 수정 안내](EDITING.ko.md)

## Content and attribution

Research text and personal photographs belong to their respective authors. Paper figures are credited through their accompanying paper links. Existing Minimal Mistakes theme files retain their original MIT license and notices. No new license is granted for research figures or personal content by the legacy theme license.

## For research and search agents

The same public content is available in several formats:

- [`llms.txt`](https://jasonkim8652.github.io/llms.txt): concise research navigation and links to clean text.
- [`llms-full.txt`](https://jasonkim8652.github.io/llms-full.txt): current research pages and notes in one file.
- [`research.json`](https://jasonkim8652.github.io/research.json): profile, three aims, publication status, code repositories, and notes.
- Each HTML page links to a Markdown alternative at `index.md` (for example, `/research/design-agents/index.md`).

These files are generated automatically from the rendered pages and content data. Editing a note updates its HTML, Markdown, and index entries together. JSON-LD identifies the researcher and connects notes to the underlying papers. Manuscripts and preprints retain their actual status; future research remains labelled as future work. Current notes remain undated.

These resources help compatible readers retrieve content; they do not guarantee search indexing, ranking, or inclusion in an AI answer.

## Research framing · October 25, 2026

The three aims remain Design, Experiment, and Learn. Design gives independent visibility to biological prediction/generation and to agent reasoning. Learn considers model adaptation alongside agent learning and research decisions. Home, About, research pages, and discovery metadata connect these contributions to the longer-term AI-scientist vision. Existing paper figures, routes, and publication status are preserved.
