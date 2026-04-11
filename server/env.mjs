import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const parseEnvFile = (contents) => {
  const entries = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    entries[key] = value;
  }

  return entries;
};

export const loadServerEnv = () => {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const fileEntries = parseEnvFile(readFileSync(envPath, "utf8"));
  for (const [key, value] of Object.entries(fileEntries)) {
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
};
