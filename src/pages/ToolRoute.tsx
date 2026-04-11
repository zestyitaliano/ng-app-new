import React, { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import SiteTopNav from "../components/SiteTopNav";
import { TOOLS_BY_SLUG } from "../tools/registry";

export default function ToolRoute() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? TOOLS_BY_SLUG[slug] : null;

  if (!slug || !entry) {
    return (
      <div className="min-h-screen p-6">
        <SiteTopNav className="-mx-6 -mt-6 mb-6" />
        <div className="max-w-5xl mx-auto space-y-3">
          <h1 className="text-xl font-bold">Tool not found</h1>
          <p className="text-sm text-gray-600">
            No tool registered for: <span className="font-mono">{slug}</span>
          </p>
          <div className="flex gap-3">
            <Link className="underline" to="/">Home</Link>
            <Link className="underline" to="/tools">Tools</Link>
          </div>
        </div>
      </div>
    );
  }

  const Tool = entry.Component;

  return (
    <div className="min-h-screen">
      <SiteTopNav />
      <Suspense
        fallback={
          <div className="p-6">
            <div className="max-w-5xl mx-auto text-sm text-gray-600">
              Loading…
            </div>
          </div>
        }
      >
        <Tool />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
