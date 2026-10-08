import { useEffect } from "react";
import {
  bibleStudyArchive,
  bibleStudyResources,
  currentBibleStudyWeek,
} from "../data/bibleStudyResources";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
      focusable="false"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"
      />
    </svg>
  );
}

function BibleStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Bible Study | Christ Temple GIPHC";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section aria-labelledby="bible-study-title">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-steeple">
          Learn together. Grow in the Word.
        </p>
        <h1
          id="bible-study-title"
          className="mt-4 text-3xl font-semibold md:text-5xl"
        >
          Bible study
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
          Watch a lesson, follow along with the notes, and keep studying
          throughout the week with guides for class and personal study.
        </p>
      </section>

      <section
        id="study-resources"
        aria-labelledby="study-resources-title"
        tabIndex={-1}
        className="mt-16 scroll-mt-6 focus:outline-none"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-steeple">
              Week {currentBibleStudyWeek.week}
            </p>
            <h2 id="study-resources-title" className="text-2xl font-semibold">
              Lessons and study guides
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            {bibleStudyResources.length}{" "}
            {bibleStudyResources.length === 1 ? "resource" : "resources"}
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-2">
          {bibleStudyResources.map((resource) => {
            const pdfUrl = `/notes/${resource.fileName}`;
            const videoUrl = resource.video
              ? "/videos/" + resource.video.fileName
              : null;

            return (
              <li
                key={resource.id}
                className={resource.video ? "flex md:col-span-2" : "flex"}
              >
                <article
                  aria-labelledby={`${resource.id}-title`}
                  className="flex w-full flex-col rounded-3xl bg-white p-8 shadow-lg"
                >
                  <div
                    className="mb-6 h-1.5 w-12 rounded-full bg-steeple"
                    aria-hidden="true"
                  />
                  <p className="text-xs uppercase leading-5 tracking-[0.24em] text-slate-500">
                    {resource.category}
                  </p>
                  <h3
                    id={`${resource.id}-title`}
                    className="mt-3 text-2xl font-semibold"
                  >
                    {resource.title}
                  </h3>
                  <p className="mb-6 mt-4 text-sm leading-7 text-slate-600">
                    {resource.description}
                  </p>

                  {resource.video && (
                    <figure className="mb-8">
                      <video
                        controls
                        playsInline
                        preload="none"
                        poster={"/videos/" + resource.video.posterFileName}
                        aria-label={resource.title + " video"}
                        className="aspect-video w-full rounded-2xl bg-sanctuary"
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser cannot play this video. Use the Download
                        video link below to watch it on your device.
                      </video>
                      <figcaption className="mt-3 text-xs text-slate-500">
                        {resource.video.duration} ·{" "}
                        {(resource.video.sizeBytes / 1000000).toFixed(1)} MB
                      </figcaption>
                    </figure>
                  )}

                  <div className="mt-auto">
                    <p className="mb-5 text-xs text-slate-500">
                      PDF · {resource.pageCount}{" "}
                      {resource.pageCount === 1 ? "page" : "pages"} ·{" "}
                      {Math.ceil(resource.sizeBytes / 1024)} KB
                    </p>
                    {resource.available === false ? (
                      <p className="rounded-full bg-skyglass/50 px-5 py-3 text-sm text-slate-600">
                        PDF coming soon
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${resource.title} (PDF, opens in a new tab)`}
                          className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-bronze px-5 py-3 text-sm font-semibold text-sanctuary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                        >
                          View PDF <span aria-hidden="true">↗</span>
                        </a>
                        <a
                          href={pdfUrl}
                          download={resource.fileName}
                          aria-label={`Download ${resource.title} (PDF)`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sanctuary/20 px-5 py-3 text-sm font-semibold text-sanctuary transition hover:bg-skyglass/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                        >
                          <DownloadIcon /> Download
                        </a>
                        {resource.video && (
                          <a
                            href={videoUrl}
                            download={resource.video.fileName}
                            aria-label={"Download " + resource.title + " video"}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sanctuary/20 px-5 py-3 text-sm font-semibold text-sanctuary transition hover:bg-skyglass/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                          >
                            <DownloadIcon /> Download video
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {bibleStudyResources.some((resource) => resource.available !== false) && (
          <aside className="mt-12 rounded-[2rem] bg-sanctuary p-8 text-white shadow-lg">
            <h3 className="text-xl font-semibold">Keep a copy for the week</h3>
            <p className="mt-4 text-sm leading-7 text-white/90">
              Download a guide to read on your phone, print for class, or return
              to during your personal study. These resources are free to access.
            </p>
          </aside>
        )}
      </section>

      <section aria-labelledby="study-archive-title" className="mt-16">
        <h2 id="study-archive-title" className="text-2xl font-semibold">
          Previous weeks
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Download a previous week’s video and study materials together in one ZIP file.
        </p>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-sanctuary/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Previous Bible study weeks and complete lesson downloads
            </caption>
            <thead className="bg-sanctuary text-white">
              <tr>
                <th scope="col" className="whitespace-nowrap px-5 py-4 font-semibold">
                  Week
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Lesson
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sanctuary/10">
              {bibleStudyArchive.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-8 leading-7 text-slate-500">
                    Previous weeks will appear here when the next lesson is posted.
                  </td>
                </tr>
              ) : (
                bibleStudyArchive.map((week) => (
                  <tr key={week.week}>
                    <th scope="row" className="whitespace-nowrap px-5 py-5 align-top font-semibold">
                      Week {week.week}
                    </th>
                    <td className="px-5 py-5 align-top leading-7 text-slate-600">
                      {week.title}
                    </td>
                    <td className="px-5 py-5 align-top">
                      {week.download ? (
                        <>
                          <a
                            href={"/archives/" + week.download.fileName}
                            download={week.download.fileName}
                            aria-label={"Download all Week " + week.week + " lesson materials (ZIP)"}
                            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-bronze px-5 py-3 font-semibold text-sanctuary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                          >
                            <DownloadIcon /> Download ZIP
                          </a>
                          <p className="mt-2 text-xs text-slate-500">
                            ZIP · {(week.download.sizeBytes / 1000000).toFixed(1)} MB
                          </p>
                        </>
                      ) : (
                        <p className="leading-7 text-slate-500">Download coming soon</p>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default BibleStudy;
