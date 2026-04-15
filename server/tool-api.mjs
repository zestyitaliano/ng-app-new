import dns from "node:dns";

export const DNS_RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS"];

const REDIRECT_USER_AGENT =
  "NoGatekeepingBot/1.0 (+https://nogatekeeping.com)";

const sanitizeDomain = (input = "") => {
  let value = String(input).trim().toLowerCase();

  if (value.startsWith("http://")) value = value.slice(7);
  if (value.startsWith("https://")) value = value.slice(8);
  if (value.includes("/")) value = value.split("/")[0];
  if (value.includes("?")) value = value.split("?")[0];
  if (value.includes("#")) value = value.split("#")[0];

  return value.replace(/\.+$/, "");
};

const normalizeTargetUrl = (input = "") => {
  const value = String(input).trim();
  if (!value) {
    throw new Error("A domain or URL is required.");
  }

  const prefixed = /^https?:\/\//i.test(value) ? value : `http://${value}`;
  return new URL(prefixed).href;
};

export const lookupDnsRecords = async ({ domain, type, server }) => {
  const cleanDomain = sanitizeDomain(domain);
  const cleanType = String(type || "").trim().toUpperCase();
  const cleanServer = String(server || "").trim();

  if (!cleanDomain) {
    throw new Error("A valid domain is required.");
  }

  if (!DNS_RECORD_TYPES.includes(cleanType)) {
    throw new Error("Unsupported record type.");
  }

  if (!cleanServer) {
    throw new Error("A DNS resolver IP is required.");
  }

  const resolver = new dns.promises.Resolver({
    timeout: 5000,
    tries: 2,
  });

  resolver.setServers([cleanServer]);

  try {
    let records = [];

    switch (cleanType) {
      case "A":
        records = await resolver.resolve4(cleanDomain);
        break;
      case "AAAA":
        records = await resolver.resolve6(cleanDomain);
        break;
      case "CNAME":
        records = await resolver.resolveCname(cleanDomain);
        break;
      case "MX":
        records = await resolver.resolveMx(cleanDomain);
        break;
      case "TXT":
        records = await resolver.resolveTxt(cleanDomain);
        break;
      case "NS":
        records = await resolver.resolveNs(cleanDomain);
        break;
      default:
        records = [];
    }

    return {
      domain: cleanDomain,
      type: cleanType,
      server: cleanServer,
      records,
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error) {
      const code = String(error.code || "");
      if (code === "ENODATA" || code === "ENOTFOUND" || code === "NODATA") {
        return {
          domain: cleanDomain,
          type: cleanType,
          server: cleanServer,
          records: [],
        };
      }
    }

    throw error;
  }
};

export const analyzeRedirectChain = async (inputUrl, maxRedirects = 10) => {
  const redirects = [];
  const visited = new Set();
  let currentUrl = normalizeTargetUrl(inputUrl);
  let finalStatus = 200;
  let error = null;

  for (let step = 0; step < maxRedirects; step += 1) {
    if (visited.has(currentUrl)) {
      error = "Redirect loop detected.";
      break;
    }

    visited.add(currentUrl);

    let response;
    try {
      response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          "user-agent": REDIRECT_USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
    } catch (fetchError) {
      error =
        fetchError instanceof Error ? fetchError.message : "Failed to fetch URL.";
      break;
    }

    finalStatus = response.status;

    if (finalStatus >= 300 && finalStatus < 400) {
      const location = response.headers.get("location");

      if (!location) {
        error = "Redirect response was missing a Location header.";
        break;
      }

      const nextUrl = new URL(location, currentUrl).href;
      redirects.push({
        from: currentUrl,
        to: nextUrl,
        status: finalStatus,
      });
      currentUrl = nextUrl;
      continue;
    }

    break;
  }

  if (!error && redirects.length >= maxRedirects) {
    error = "Too many redirects.";
  }

  return {
    initialUrl: normalizeTargetUrl(inputUrl),
    finalUrl: currentUrl,
    redirects,
    finalStatus,
    error,
  };
};
