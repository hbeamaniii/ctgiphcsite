import { useEffect } from "react";
import { bibleStudyResources } from "../data/bibleStudyResources";

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7"
      aria-hidden="true"
      focusable="false"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M8 12h8M8 16h5"
      />
    </svg>
  );
}

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
    document.title = "Bible Study Notes | Christ Temple GIPHC";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="bg-stone text-sanctuary">
      <section
        className="bg-sanctuary px-6 pb-16 pt-14 text-white sm:pb-20 sm:pt-20"
        aria-labelledby="bible-study-title"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bronze">
            Learn together. Grow in the Word.
          </p>
          <h1
            id="bible-study-title"
            className="mt-5 max-w-3xl font-serif text-5xl leading-[1.08] sm:text-6xl"
          >
            Bible study notes
          </h1>
          <div className="mt-6 h-0.5 w-12 bg-bronze" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-base leading-8 text-skyglass sm:text-lg">
            Follow along, revisit a lesson, and keep studying throughout the
            week with guides for class and personal study.
          </p>
          <a
            href="#study-resources"
            className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-lg border border-bronze/60 px-5 py-3 text-sm font-semibold text-bronze transition hover:bg-bronze/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            Browse study guides <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        id="study-resources"
        aria-labelledby="study-resources-title"
        tabIndex={-1}
        className="mx-auto max-w-5xl scroll-mt-6 px-6 py-12 focus:outline-none sm:py-16"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sanctuary/65">
              Resources for your study
            </p>
            <h2
              id="study-resources-title"
              className="mt-2 font-serif text-3xl sm:text-4xl"
            >
              Study guides
            </h2>
          </div>
          <p className="text-sm text-sanctuary/65">
            {bibleStudyResources.length}{" "}
            {bibleStudyResources.length === 1 ? "resource" : "resources"}
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {bibleStudyResources.map((resource) => {
            const pdfUrl = `/notes/${resource.fileName}`;
            return (
              <li key={resource.id} className="flex">
                <article
                  aria-labelledby={`${resource.id}-title`}
                  className="flex w-full flex-col rounded-2xl border border-sanctuary/10 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-skyglass/60 text-sanctuary">
                    <DocumentIcon />
                  </div>
                  <p className="text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-sanctuary/65">
                    {resource.category}
                  </p>
                  <h3
                    id={`${resource.id}-title`}
                    className="mt-3 font-serif text-2xl leading-snug sm:text-3xl"
                  >
                    {resource.title}
                  </h3>
                  <p className="mb-6 mt-4 text-sm leading-7 text-sanctuary/75">
                    {resource.description}
                  </p>
                  <div className="mt-auto">
                    <p className="mb-5 text-xs font-medium text-sanctuary/65">
                      PDF · {resource.pageCount}{" "}
                      {resource.pageCount === 1 ? "page" : "pages"} ·{" "}
                      {Math.ceil(resource.sizeBytes / 1024)} KB
                    </p>
                    {resource.available === false ? (
                      <p className="rounded-lg border border-sanctuary/10 bg-stone px-5 py-3 text-sm font-medium text-sanctuary/65">
                        PDF coming soon
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${resource.title} (PDF, opens in a new tab)`}
                          className="inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-sanctuary px-5 py-3 text-sm font-semibold text-white transition hover:bg-sanctuary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                        >
                          View PDF <span aria-hidden="true">↗</span>
                        </a>
                        <a
                          href={pdfUrl}
                          download={resource.fileName}
                          aria-label={`Download ${resource.title} (PDF)`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-sanctuary/20 px-5 py-3 text-sm font-semibold text-sanctuary transition hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sanctuary"
                        >
                          <DownloadIcon /> Download
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {bibleStudyResources.some((resource) => resource.available !== false) && (
          <aside className="mt-8 rounded-xl border-l-4 border-bronze bg-white/65 px-6 py-5">
            <h3 className="text-sm font-semibold">Keep a copy for the week</h3>
            <p className="mt-2 text-sm leading-7 text-sanctuary/75">
              Download a guide to read on your phone, print for class, or return
              to during your personal study. These resources are free to access.
            </p>
          </aside>
        )}
      </section>
    </div>
  );
}

export default BibleStudy;
