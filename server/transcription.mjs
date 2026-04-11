import os from "node:os";
import path from "node:path";
import { execFile as execFileCallback } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

const PYTHON_EXECUTABLE =
  process.env.FASTER_WHISPER_PYTHON || path.resolve(process.cwd(), ".venv/bin/python");
const TRANSCRIBE_SCRIPT = path.resolve(
  process.cwd(),
  "server/transcribe_local.py",
);

export const TRANSCRIBE_MODEL =
  process.env.FASTER_WHISPER_MODEL || "base";

const getExtensionForMimeType = (mimeType = "") => {
  if (mimeType.includes("mp4")) return ".mp4";
  if (mimeType.includes("ogg")) return ".ogg";
  if (mimeType.includes("wav")) return ".wav";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return ".mp3";
  return ".webm";
};

const createTempAudioFile = async ({ inputBuffer, filename, mimeType }) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "dictate-audio-"));
  const safeBaseName =
    path
      .basename(filename || "dictation", path.extname(filename || "dictation"))
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "dictation";
  const filePath = path.join(
    directory,
    `${safeBaseName}${getExtensionForMimeType(mimeType)}`,
  );

  await writeFile(filePath, inputBuffer);
  return { directory, filePath };
};

export const hasLocalTranscriptionSetup = () => existsSync(PYTHON_EXECUTABLE);

export const transcribeAudioBuffer = async ({
  inputBuffer,
  filename,
  mimeType,
  language,
  prompt,
}) => {
  const { directory, filePath } = await createTempAudioFile({
    inputBuffer,
    filename,
    mimeType,
  });

  try {
    const args = [
      TRANSCRIBE_SCRIPT,
      "--file",
      filePath,
      "--model",
      TRANSCRIBE_MODEL,
    ];

    if (language) {
      args.push("--language", language);
    }

    if (prompt) {
      args.push("--prompt", prompt);
    }

    const { stdout, stderr } = await execFile(PYTHON_EXECUTABLE, args, {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
    });

    if (stderr?.trim()) {
      console.warn(stderr.trim());
    }

    const parsed = JSON.parse(stdout);
    const text = typeof parsed?.text === "string" ? parsed.text.trim() : "";

    return {
      text,
      model:
        typeof parsed?.model === "string" && parsed.model.trim()
          ? parsed.model
          : TRANSCRIBE_MODEL,
    };
  } catch (error) {
    const stderr =
      error && typeof error === "object" && "stderr" in error
        ? String(error.stderr || "")
        : "";
    const stdout =
      error && typeof error === "object" && "stdout" in error
        ? String(error.stdout || "")
        : "";

    let message = "Local audio transcription failed.";

    for (const source of [stderr, stdout]) {
      const trimmed = source.trim();
      if (!trimmed) continue;

      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed?.error === "string" && parsed.error.trim()) {
          message = parsed.error;
          break;
        }
      } catch {
        message = trimmed;
        break;
      }
    }

    throw new Error(message);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};
