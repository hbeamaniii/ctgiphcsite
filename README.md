# Christ Temple GIPHC website

React, Vite, Tailwind CSS, and React Router power the church website. PDF study
guides are served directly from `public/notes/` and lesson recordings from
`public/videos/`; the Bible study page needs no
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

This produces a Bible-study-only production build in `dist/`, including the
PDFs and lesson recordings.

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

The current resources are Bible Study Lesson 1, the Bible Organization Study
Guide, and Biblical Criticism Quick Reference. They are listed without lesson
dates because dates have not yet been assigned to them. Their PDFs are included
in `public/notes/` and available through the View and Download links.

## Add a lesson recording

1. Put the MP4 and a poster image in `public/videos/`. Use filenames without
   spaces. The current lesson uses H.264 video and AAC audio.
2. Add an optional `video` object to its existing entry in
   `src/data/bibleStudyResources.js`, with `fileName`, `posterFileName`,
   `duration` (a readable label), and `sizeBytes`. This shows a video player and
   a Download video link alongside the lesson PDF. Resources without `video`
   continue to show PDF links only.
3. Check playback, seeking, and the download, then build and push `bible-study`.

The player loads the poster first and waits until the viewer presses Play to
request the recording. The supplied Lesson 1 recording is 99,902,097 bytes and
45 minutes 24 seconds long. Its original bytes are preserved.

The GitHub upload API rejected this recording as a single blob. Its source is
stored in `media/bible-study/lesson-1/` as 24 smaller binary parts and a manifest.
The development and build scripts automatically run `prepare:study-media` to
reconstruct `public/videos/Bible_Study_Lesson_1.mp4`. Each part and the complete
recording are checked against their SHA-256 hashes; a missing or altered part
stops the build. The generated MP4 is ignored by Git. The parts stay outside
`public/`, so the deployed website serves one MP4 without duplicate parts.

When replacing this recording, update its parts and manifest together. Run
`npm run prepare:study-media` to verify them before committing. A fresh checkout
does not contain the generated MP4 until a development or build command runs.

GitHub's browser uploader accepts files up to 25 MiB; larger recordings need a
normal Git push. Regular Git files must not exceed 100 MiB. For a growing weekly
archive, use the church's YouTube channel or separate media storage and adapt
the page to embed those recordings rather than accumulating large MP4s in Git.
See [GitHub's file limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

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
3. The supplied rule excludes `pdf` and `mp4`, along with JavaScript, CSS, images,
   and other static file types. This lets `/notes/*.pdf` and `/videos/*.mp4`
   return the actual files instead of the React HTML page. If the console rule
   was copied before recordings were added, update it to include `mp4`; pushing
   this JSON reference does not update the console. Missing files should remain
   a 404.
4. Test the branch's Amplify URL: `/`, `/biblestudy`, a refresh on
   `/biblestudy`, all View and Download links, and video playback and seeking.
   Opening `/leadership`
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
