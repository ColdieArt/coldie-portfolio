import type { MarkdownInstance } from 'astro';

// Interview transcripts for the /interviews/[slug] watch pages. One Markdown file
// per video in ./transcripts, named after the video's `slug` in videos.ts.
// Frontmatter holds the summary, chapters and quotes; the body is the transcript.
// A page stays noindex (and out of the sitemap) until its file sets `ready: true`.

export type Chapter = { t: string; title: string };
export type Quote = { t: string; text: string };
export type TranscriptMeta = {
  /** Flip to true once the artist has reviewed the transcript. */
  ready: boolean;
  /** 2–3 answer-first sentences on what the interview covers. */
  summary: string;
  chapters?: Chapter[];
  quotes?: Quote[];
};

const files = import.meta.glob<MarkdownInstance<TranscriptMeta>>('./transcripts/*.md', { eager: true });

export const transcripts: Record<string, MarkdownInstance<TranscriptMeta>> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.md$/, ''), mod])
);

/** "1:02:15" / "12:40" → seconds. */
export const toSeconds = (t: string) => t.split(':').reduce((n, x) => n * 60 + Number(x), 0);
