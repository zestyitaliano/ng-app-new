import React from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../tools/registry";

export default function ToolsIndex() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Tools</h1>
        <p className="text-gray-600">Pick a tool to get started.</p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ meta }) => (
            <Link
              key={meta.slug}
              to={`/tools/${meta.slug}`}
              className="border rounded-none p-4 hover:bg-offwhite transition"
            >
              <div className="text-xs uppercase tracking-wide text-gray-600">
                {meta.category}
              </div>
              <div className="text-lg font-bold">{meta.title}</div>
              <div className="text-sm text-gray-600">{meta.description}</div>
              <div className="mt-3 underline text-sm">Open</div>
            </Link>
          ))}
        </div>

        <Link className="underline" to="/">Back home</Link>
      </div>
    </div>
  );
}
