import React from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Thoughts, tutorials, and notes on design tools, workflows, and
            building without gatekeeping.
          </p>
        </header>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Empty state */}
        <section className="py-24 text-center space-y-4">
          <h2 className="text-xl font-semibold">
            No posts yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            This is where blog posts will live. You can start by adding a
            simple post list, Markdown files, or connect a CMS later.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/"
              className="px-4 py-2 border border-gray-300 rounded-none text-sm font-medium hover:bg-gray-100"
            >
              Back home
            </Link>

            <Link
              to="/tools"
              className="px-4 py-2 bg-black text-white rounded-none text-sm font-medium hover:bg-gray-800"
            >
              Browse tools
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
