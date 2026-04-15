import { analyzeRedirectChain } from "../server/tool-api.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const result = await analyzeRedirectChain(req.query?.url);
    res.status(200).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Redirect analysis failed.";

    res.status(400).json({ error: message });
  }
}
