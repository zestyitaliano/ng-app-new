import React, { useMemo, useState } from "react";
import { Loader2, Search, ServerCrash, TimerReset } from "lucide-react";
import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";
import { DNS_SERVERS, RECORD_TYPES } from "./constants";

type ResultStatus = "idle" | "loading" | "success" | "error";

type ServerResult = {
  status: ResultStatus;
  records?: unknown[];
  error?: string;
  latency?: number;
};

function sanitizeDomain(input: string) {
  let value = input.trim().toLowerCase();
  if (value.startsWith("http://")) value = value.slice(7);
  if (value.startsWith("https://")) value = value.slice(8);
  if (value.includes("/")) value = value.split("/")[0];
  return value.replace(/\.+$/, "");
}

function formatRecord(record: unknown, type: string) {
  if (typeof record === "string") return record;
  if (type === "MX" && record && typeof record === "object") {
    const mx = record as { priority?: number; exchange?: string };
    return `${mx.priority ?? ""} ${mx.exchange ?? ""}`.trim();
  }
  if (type === "TXT" && Array.isArray(record)) {
    return record.join("");
  }
  return JSON.stringify(record);
}

export default function DnsCheckerTool() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] =
    useState<(typeof RECORD_TYPES)[number]>("A");
  const [results, setResults] = useState<Record<string, ServerResult>>({});
  const [isSearching, setIsSearching] = useState(false);

  const stats = useMemo(() => {
    const entries = Object.values(results);
    const completed = entries.filter(
      (result) => result.status === "success" || result.status === "error",
    );
    const propagated = entries.filter(
      (result) =>
        result.status === "success" &&
        Array.isArray(result.records) &&
        result.records.length > 0,
    );
    const latencies = entries
      .map((result) => result.latency)
      .filter((value): value is number => typeof value === "number");

    const averageLatency =
      latencies.length > 0
        ? Math.round(
            latencies.reduce((sum, value) => sum + value, 0) / latencies.length,
          )
        : 0;

    return {
      propagated: `${propagated.length}/${DNS_SERVERS.length}`,
      completed: `${completed.length}/${DNS_SERVERS.length}`,
      latency: latencies.length > 0 ? `${averageLatency} ms` : "Pending",
    };
  }, [results]);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const cleanDomain = sanitizeDomain(domain);
    if (!cleanDomain) return;

    setDomain(cleanDomain);
    setIsSearching(true);

    setResults(
      Object.fromEntries(
        DNS_SERVERS.map((server) => [server.id, { status: "loading" as const }]),
      ),
    );

    await Promise.all(
      DNS_SERVERS.map(async (server) => {
        const start = performance.now();

        try {
          const response = await fetch(
            `/api/dns-check?domain=${encodeURIComponent(cleanDomain)}&type=${recordType}&server=${encodeURIComponent(server.ip)}`,
          );
          const data = await response.json();
          const latency = Math.round(performance.now() - start);

          if (!response.ok) {
            throw new Error(data.error || "Lookup failed.");
          }

          setResults((current) => ({
            ...current,
            [server.id]: {
              status: "success",
              records: data.records,
              latency,
            },
          }));
        } catch (error) {
          const latency = Math.round(performance.now() - start);
          setResults((current) => ({
            ...current,
            [server.id]: {
              status: "error",
              error:
                error instanceof Error ? error.message : "Lookup failed.",
              latency,
            },
          }));
        }
      }),
    );

    setIsSearching(false);
  }

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-7xl">
      <div className="space-y-6">
        <section className="ng-card grid gap-6 p-6 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)]">
          <form className="space-y-6" onSubmit={handleSearch}>
            <div className="space-y-2">
              <div className="ng-eyebrow">Global Resolver Sweep</div>
              <h2 className="text-3xl font-extrabold uppercase tracking-[-0.06em]">
                Check Propagation Fast
              </h2>
              <p className="text-sm leading-6 text-[var(--ng-text-muted)]">
                Query multiple public resolvers in parallel to see where a record
                has propagated and where it has not.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="ng-eyebrow text-[var(--ng-text)]">Domain</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ng-text-muted)]" />
                <input
                  className="ng-input pl-11"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  placeholder="example.com"
                  required
                />
              </div>
            </label>

            <div className="space-y-3">
              <span className="ng-eyebrow text-[var(--ng-text)]">
                Record Type
              </span>
              <div className="flex flex-wrap gap-2">
                {RECORD_TYPES.map((type) => (
                  <button
                    key={type}
                    className={
                      type === recordType
                        ? "ng-button ng-button-primary"
                        : "ng-button ng-button-outline"
                    }
                    onClick={() => setRecordType(type)}
                    type="button"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="ng-button ng-button-primary w-full gap-2 py-3"
              disabled={isSearching}
              type="submit"
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Run DNS Sweep
            </button>
          </form>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="ng-panel">
              <div className="ng-eyebrow text-[var(--ng-text)]">Propagated</div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {stats.propagated}
              </p>
            </div>
            <div className="ng-panel bg-[var(--ng-accent-yellow)]">
              <div className="ng-eyebrow text-[var(--ng-text)]">Completed</div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {stats.completed}
              </p>
            </div>
            <div className="ng-panel">
              <div className="ng-eyebrow text-[var(--ng-text)]">
                Average Latency
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {stats.latency}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {DNS_SERVERS.map((server) => {
            const result = results[server.id];
            const hasRecords =
              result?.status === "success" &&
              Array.isArray(result.records) &&
              result.records.length > 0;

            return (
              <article className="ng-card p-5" key={server.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="ng-eyebrow">{server.location}</div>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.05em]">
                      {server.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ng-text-muted)]">
                      {server.ip}
                    </p>
                  </div>
                  <div
                    className="h-4 w-4 border-2 border-[var(--ng-border)]"
                    style={{
                      background:
                        result?.status === "loading"
                          ? "var(--ng-primary)"
                          : hasRecords
                            ? "var(--ng-primary)"
                            : result?.status === "error"
                              ? "var(--ng-accent-red)"
                              : result?.status === "success"
                                ? "var(--ng-accent-yellow)"
                                : "var(--ng-panel)",
                    }}
                  />
                </div>

                <div className="mt-5 space-y-3">
                  {result?.status === "loading" ? (
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[var(--ng-primary)]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Querying
                    </div>
                  ) : null}

                  {result?.status === "error" ? (
                    <div className="space-y-2 text-sm leading-6">
                      <div className="flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-[var(--ng-accent-red)]">
                        <ServerCrash className="h-4 w-4" />
                        Error
                      </div>
                      <p>{result.error}</p>
                    </div>
                  ) : null}

                  {result?.status === "success" && !hasRecords ? (
                    <div className="space-y-2 text-sm leading-6">
                      <div className="flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-[var(--ng-text)]">
                        <TimerReset className="h-4 w-4" />
                        No Records Returned
                      </div>
                      <p className="text-[var(--ng-text-muted)]">
                        This resolver did not return any {recordType} records for
                        the current domain.
                      </p>
                    </div>
                  ) : null}

                  {hasRecords ? (
                    <div className="space-y-3">
                      <div className="ng-eyebrow text-[var(--ng-text)]">
                        Records
                      </div>
                      <div className="space-y-2">
                        {result.records?.map((record, index) => (
                          <div
                            className="border-2 border-[var(--ng-border-subtle)] bg-[var(--ng-panel)] px-3 py-2 text-sm"
                            key={`${server.id}-${index}`}
                          >
                            {formatRecord(record, recordType)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {typeof result?.latency === "number" ? (
                  <div className="mt-5 border-t-2 border-[var(--ng-border-subtle)] pt-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ng-text-muted)]">
                    {result.latency} ms
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>
      </div>
    </ToolLayout>
  );
}
