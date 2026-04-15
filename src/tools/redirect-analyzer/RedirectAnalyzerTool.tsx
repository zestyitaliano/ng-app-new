import React, { useMemo, useState } from "react";
import { Loader2, Search, ShieldCheck, ShieldOff } from "lucide-react";
import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";

type RedirectHop = {
  from: string;
  to: string;
  status: number;
};

type AnalysisResult = {
  initialUrl: string;
  finalUrl: string;
  redirects: RedirectHop[];
  finalStatus: number;
  error: string | null;
};

function hostFromUrl(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}

export default function RedirectAnalyzerTool() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const insights = useMemo(() => {
    if (!result) return [];

    const messages = [];
    const startedSecure = result.initialUrl.startsWith("https://");
    const endedSecure = result.finalUrl.startsWith("https://");
    const changedHost = hostFromUrl(result.initialUrl) !== hostFromUrl(result.finalUrl);

    if (!startedSecure && endedSecure) {
      messages.push("The chain upgrades the request from HTTP to HTTPS.");
    }

    if (result.redirects.length > 3) {
      messages.push("This is a longer redirect chain than ideal and may slow crawlers.");
    }

    if (changedHost) {
      messages.push("The destination host changes during the redirect chain.");
    }

    if (result.finalStatus >= 400) {
      messages.push("The final destination returns an error status.");
    }

    if (!messages.length) {
      messages.push("This redirect path looks straightforward with no obvious red flags.");
    }

    return messages;
  }, [result]);

  async function handleAnalyze(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `/api/redirect-analyzer?url=${encodeURIComponent(input.trim())}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
      if (data.error) {
        setError(data.error);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Analysis failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-7xl">
      <div className="space-y-6">
        <section className="ng-card grid gap-6 p-6 lg:grid-cols-[minmax(320px,1fr)_minmax(0,0.9fr)]">
          <form className="space-y-6" onSubmit={handleAnalyze}>
            <div className="space-y-2">
              <div className="ng-eyebrow">Chain Inspection</div>
              <h2 className="text-3xl font-extrabold uppercase tracking-[-0.06em]">
                Map Redirect Hops
              </h2>
              <p className="text-sm leading-6 text-[var(--ng-text-muted)]">
                Start from any domain or URL and inspect each redirect hop, the
                final destination, and whether the request lands on HTTPS.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="ng-eyebrow text-[var(--ng-text)]">URL</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ng-text-muted)]" />
                <input
                  className="ng-input pl-11"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="example.com or https://example.com"
                  required
                />
              </div>
            </label>

            <button
              className="ng-button ng-button-primary w-full gap-2 py-3"
              disabled={loading}
              type="submit"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Analyze Redirects
            </button>

            {error ? (
              <div className="border-2 border-[var(--ng-accent-red)] bg-[rgba(255,89,94,0.08)] p-4 text-sm leading-6">
                {error}
              </div>
            ) : null}
          </form>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="ng-panel">
              <div className="ng-eyebrow text-[var(--ng-text)]">Total Hops</div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {result ? String(result.redirects.length).padStart(2, "0") : "--"}
              </p>
            </div>
            <div className="ng-panel bg-[var(--ng-accent-yellow)]">
              <div className="ng-eyebrow text-[var(--ng-text)]">Final Status</div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {result ? result.finalStatus : "--"}
              </p>
            </div>
            <div className="ng-panel">
              <div className="ng-eyebrow text-[var(--ng-text)]">Secure End</div>
              <p className="mt-3 flex items-center gap-2 text-3xl font-extrabold tracking-[-0.06em]">
                {result?.finalUrl?.startsWith("https://") ? (
                  <>
                    <ShieldCheck className="h-6 w-6 text-[var(--ng-primary)]" />
                    Yes
                  </>
                ) : result ? (
                  <>
                    <ShieldOff className="h-6 w-6 text-[var(--ng-accent-red)]" />
                    No
                  </>
                ) : (
                  "--"
                )}
              </p>
            </div>
          </div>
        </section>

        {result ? (
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_340px]">
            <div className="ng-card p-6">
              <div className="flex items-center justify-between gap-4 border-b-2 border-[var(--ng-border-subtle)] pb-4">
                <div>
                  <div className="ng-eyebrow">Timeline</div>
                  <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-[-0.05em]">
                    Redirect Path
                  </h3>
                </div>
                <div className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--ng-text-muted)]">
                  {result.redirects.length} hops
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="border-l-4 border-[var(--ng-primary)] pl-4">
                  <div className="ng-eyebrow text-[var(--ng-text)]">Requested</div>
                  <p className="mt-2 break-all text-lg font-bold">
                    {result.initialUrl}
                  </p>
                </div>

                {result.redirects.map((hop, index) => (
                  <div
                    className="border-l-4 border-[var(--ng-accent-yellow)] pl-4"
                    key={`${hop.from}-${hop.to}-${index}`}
                  >
                    <div className="ng-eyebrow text-[var(--ng-text)]">
                      Hop {index + 1} / {hop.status}
                    </div>
                    <p className="mt-2 break-all text-sm font-medium text-[var(--ng-text-muted)]">
                      {hop.from}
                    </p>
                    <p className="mt-2 break-all text-lg font-bold">{hop.to}</p>
                  </div>
                ))}

                <div
                  className="border-l-4 pl-4"
                  style={{
                    borderColor:
                      result.finalStatus >= 400
                        ? "var(--ng-accent-red)"
                        : "var(--ng-primary)",
                  }}
                >
                  <div className="ng-eyebrow text-[var(--ng-text)]">Final URL</div>
                  <p className="mt-2 break-all text-lg font-bold">
                    {result.finalUrl}
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="ng-panel">
                <div className="ng-eyebrow text-[var(--ng-text)]">
                  Destination
                </div>
                <div className="mt-4 space-y-4 text-sm leading-6">
                  <div>
                    <div className="font-bold uppercase tracking-[0.14em] text-[var(--ng-text-muted)]">
                      Initial Host
                    </div>
                    <div className="mt-1 break-all font-medium">
                      {hostFromUrl(result.initialUrl)}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-[0.14em] text-[var(--ng-text-muted)]">
                      Final Host
                    </div>
                    <div className="mt-1 break-all font-medium">
                      {hostFromUrl(result.finalUrl)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ng-panel bg-[var(--ng-accent-yellow)]">
                <div className="ng-eyebrow text-[var(--ng-text)]">Quick Read</div>
                <div className="mt-4 space-y-3 text-sm leading-6">
                  {insights.map((message) => (
                    <p key={message}>{message}</p>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        ) : null}
      </div>
    </ToolLayout>
  );
}
