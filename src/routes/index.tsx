import { FormEvent, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import hexanxtMark from "@/assets/hexanxt-mark.png";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HexaNxt — Six minds. One future." },
      { name: "description", content: "Search beyond the obvious with HexaNxt." },
      { property: "og:title", content: "HexaNxt — Six minds. One future." },
      { property: "og:description", content: "Search beyond the obvious with HexaNxt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // Only emitted once the production origin is configured via VITE_SITE_URL —
      // a relative og:url is meaningless to crawlers, and no domain is hardcoded.
      ...(SITE_URL ? [{ property: "og:url", content: absoluteUrl("/") }] : []),
    ],
    links: SITE_URL ? [{ rel: "canonical", href: absoluteUrl("/") }] : [],
  }),
});

function Index() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const submitSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) {
      inputRef.current?.focus();
      return;
    }
    setSubmittedQuery(nextQuery);
  };

  return (
    <div className="min-h-screen bg-hexanxt-ink font-sans text-hexanxt-text selection:bg-hexanxt-purple/30">
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:pt-16">
        <section className="hexanxt-rise flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
          <div className="mb-8 flex flex-col items-center gap-4 sm:mb-10">
            <img
              className="hexanxt-mark-drift size-28 object-contain drop-shadow-[0_0_24px_color-mix(in_oklab,var(--color-hexanxt-blue)_20%,transparent)] sm:size-32"
              src={hexanxtMark}
              width={512}
              height={389}
              fetchPriority="high"
              decoding="async"
              alt="HexaNxt multicolor six-point mark"
            />
            <div>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-hexanxt-text sm:text-6xl">
                HexaNxt
              </h1>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-hexanxt-muted sm:text-sm">
                Six minds. One future.
              </p>
            </div>
          </div>

          <form onSubmit={submitSearch} className="w-full max-w-2xl">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-hexanxt-blue/10 opacity-40 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
              <div className="relative flex min-h-16 items-center rounded-2xl border border-hexanxt-surface-soft bg-hexanxt-surface px-5 shadow-2xl transition-colors group-focus-within:border-hexanxt-blue/60 sm:px-6">
                <Search aria-hidden="true" className="mr-4 size-5 shrink-0 text-hexanxt-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search HexaNxt"
                  placeholder="Find your product"
                  className="w-full bg-transparent text-base text-hexanxt-text outline-none placeholder:text-hexanxt-muted/60 sm:text-lg"
                />
                <kbd className="hidden h-6 items-center gap-1 rounded border border-hexanxt-surface-soft bg-hexanxt-ink px-2 font-mono text-[10px] text-hexanxt-muted sm:inline-flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </form>

          {submittedQuery ? (
            <p role="status" className="mt-5 text-sm text-hexanxt-teal">
              Searching HexaNxt for “{submittedQuery}”
            </p>
          ) : null}

          <a
            className="mt-8 rounded-full px-5 py-2.5 text-sm text-hexanxt-muted ring-1 ring-hexanxt-purple/60 transition-colors hover:bg-hexanxt-surface hover:text-hexanxt-text"
            href="#about"
          >
            About HexaNxt
          </a>
        </section>
      </main>
    </div>
  );
}
