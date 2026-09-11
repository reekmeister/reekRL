# Honda Legend KB1 / KB2 Manual — GitHub-ready archive

This repository packages the supplied Honda Legend 2007–2010 workshop/body-repair manual files and adds a modern static search UI.

## What is included

- Original manual assets under `en/` (HTML, JavaScript, images, styles, data)
- `HONDAESM.HTML` — original legacy entry point
- `index.html` — modern search homepage
- `viewer.html` — compatibility wrapper that keeps legacy `parent.Cts()` navigation working inside an iframe
- `data/manual-index.js` — generated search catalog (0 indexed procedures)
- `assets/` — UI CSS and search logic
- `NOTICE.md` — redistribution note

## GitHub Pages

1. Create a repository and upload the contents of this folder.
2. In **Settings → Pages**, choose **Deploy from a branch** and select the default branch + `/ (root)`.
3. Open the resulting Pages URL. The homepage is `index.html`.

No Node.js, server, database, or build step is required.

## Local preview

Because the legacy manual pages use browser scripting, serve the repository over HTTP instead of opening files directly. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Search behavior

Search is entirely client-side. The generated catalog is built from the original `SML_*` and `BRL_*` index pages and links each result to its original HTML procedure page.

## Source / rights

The manual content is third-party manufacturer documentation supplied by the user. Before publishing the repository publicly, verify that you have the right to redistribute those files.
