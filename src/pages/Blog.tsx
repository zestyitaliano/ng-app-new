import React from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import SiteTopNav from "../components/SiteTopNav";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

const POSTS: BlogPost[] = [];

export default function Blog() {
  return (
    <div
      className="min-h-screen text-slate-900"
      style={{
        background:
          "linear-gradient(90deg, rgba(25,130,196,0.08) 1px, transparent 1px), linear-gradient(rgba(25,130,196,0.08) 1px, transparent 1px), var(--ng-bg)",
        backgroundSize: "80px 80px",
      }}
    >
      <SiteTopNav />

      <main className="py-8 sm:py-12">
        <div className="ng-page-shell space-y-8">
          <section className="ng-card grid gap-6 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
            <div className="space-y-5">
              <div className="ng-eyebrow">Editorial / Notes & Tutorials</div>
              <h1 className="max-w-[10ch] text-5xl font-extrabold uppercase leading-[0.86] tracking-[-0.08em] text-primary sm:text-7xl">
                The Blog
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--ng-text-muted)] sm:text-lg">
                A structured post feed for product notes, workflow breakdowns, and practical design-tool writing.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="ng-panel">
                <div className="ng-eyebrow text-[var(--ng-text)]">Ready For Posts</div>
                <p className="mt-3 text-sm leading-6">
                  This page is now laid out like a real blog index, so adding posts later is mostly a data problem, not a redesign problem.
                </p>
              </div>

              <div className="ng-panel bg-[var(--ng-accent-yellow)]">
                <div className="ng-eyebrow text-[var(--ng-text)]">Next Step</div>
                <p className="mt-3 text-sm leading-6">
                  Replace the empty `POSTS` array with real content from Markdown, MDX, or a CMS and this page will render a proper archive.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="ng-eyebrow">Archive</div>
                <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-[-0.06em] sm:text-4xl">
                  Latest Posts
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link className="ng-button ng-button-outline" to="/">
                  Back Home
                </Link>
                <Link className="ng-button ng-button-primary" to="/tools">
                  Browse Tools
                </Link>
              </div>
            </div>

            {POSTS.length === 0 ? (
              <div className="ng-card-muted p-8 sm:p-12">
                <div className="max-w-2xl space-y-4">
                  <div className="ng-eyebrow text-[var(--ng-text)]">Empty State</div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-[-0.05em]">
                    No posts yet
                  </h3>
                  <p className="text-sm leading-7 text-[var(--ng-text-muted)] sm:text-base">
                    The structure is ready for a real editorial feed: hero, archive heading, and card-based entries. When posts are added, each one should include a title, excerpt, category, date, and read time.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {POSTS.map((post) => (
                  <article key={post.slug} className="ng-card grid gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="ng-eyebrow">{post.category}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ng-text-muted)]">
                        {post.date}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ng-text-muted)]">
                        {post.readTime}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-extrabold tracking-[-0.05em]">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-6 text-[var(--ng-text-muted)]">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
