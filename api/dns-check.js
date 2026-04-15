import { lookupDnsRecords } from "../server/tool-api.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const result = await lookupDnsRecords({
      domain: req.query?.domain,
      type: req.query?.type,
      server: req.query?.server,
    });

    res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "DNS lookup failed.";

    res.status(400).json({ error: message });
  }
}
