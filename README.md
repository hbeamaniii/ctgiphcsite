# Christ Temple GIPHC website

React, Vite, Tailwind CSS, and React Router power the church website. PDF study
guides are served directly from `public/notes/`; the Bible study page needs no
API key, database, or separate storage service.

## Work on the Bible study page

Use a Node.js version supported by the installed Vite release, then run:

```powershell
npm ci
npm run dev:bible-study
```

Open the local URL Vite prints. In this mode, `/` redirects to `/biblestudy`,
and other church routes redirect there too. The header and footer offer only
the Bible study page.

```powershell
npm run build:bible-study
npm run preview
```

This produces a notes-only production build in `dist/`, including the PDFs.

## Work on the full church website

```powershell
npm run dev
npm run build
```

The normal mode preserves the existing church pages and adds `/biblestudy`
and a Bible Study navigation link. The calendar and media integrations still
use their existing local or Amplify environment variables. Do not commit
private `.env` files.

## Add or update study notes

1. Put a PDF in `public/notes/`. Use a filename without spaces.
2. Add an entry to `src/data/bibleStudyResources.js` with a unique `id`, title,
   category, description, exact `fileName`, page count, and file size in bytes.
   Put new resources at the top of the list. Update the metadata when replacing
   an existing file. Set `available: false` to list a guide whose PDF is not
   ready yet; remove that flag or set it to `true` after adding its PDF.
3. Run `npm run dev:bible-study`, check both View and Download links, and run
   `npm run build:bible-study`.
4. Commit the page data and PDF, then push `bible-study`.

The initial resources are the Bible Organization Study Guide and Biblical
Criticism Quick Reference. They are listed without lesson dates because dates
have not yet been assigned to them. Both original PDFs are included in
`public/notes/` and available through the View and Download links.

## Deploy the notes branch to Amplify

1. Connect the `bible-study` branch to the existing Amplify app. Use the
   repository's `amplify.yml` build specification. It selects
   `build:bible-study` when `AWS_BRANCH` is `bible-study`; other branches use
   the full-site build. The build output directory is `dist`.
2. In **Hosting → Rewrites and redirects**, review the existing rules. Use the
   SPA rule in `docs/amplify-rewrites.json` so directly opening or refreshing
   `/biblestudy` loads the app. That JSON file is a console reference; it is
   **not applied automatically** by `amplify.yml`. Retain any needed domain
   redirects, and replace conflicting catch-all rules instead of appending
   a second SPA rule beneath them. Amplify app rewrite rules can affect both
   branches.
3. The supplied rule excludes `pdf`, along with JavaScript, CSS, images, and
   other static file types. This lets `/notes/*.pdf` return real PDFs instead
   of the React HTML page. A missing PDF should remain a 404.
4. Test the branch's Amplify URL: `/`, `/biblestudy`, a refresh on
   `/biblestudy`, both View links, and both downloads. Opening `/leadership`
   in this build should take you to the study page.
5. When ready to publish, map `christtemplegiphc.com` to the **bible-study**
   branch in Amplify's custom domain settings. Route 53 manages the domain.

The push alone does not connect the domain. The full site remains on its
existing `master` deployment until the domain mapping is changed.

AWS references: [build settings](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)
and [SPA rewrites](https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html).

## Merge when the full site is ready

These changes can merge into `master` without removing its pages. The build
mode controls which routes are available: the `bible-study` deployment exposes
only study notes, while `master` exposes the full church website including
the study page. Switch the custom domain to `master` only when that site is
ready for the public.
