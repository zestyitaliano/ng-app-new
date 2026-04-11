#!/usr/bin/env python3

import argparse
import json
import sys


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--model", default="base")
    parser.add_argument("--language")
    parser.add_argument("--prompt")
    return parser.parse_args()


def main():
    args = parse_args()

    try:
        from faster_whisper import WhisperModel
    except Exception:
        print(
            json.dumps(
                {
                    "error": "faster-whisper is not installed. Create .venv and run `pip install faster-whisper` before using local transcription."
                }
            )
        )
        sys.exit(1)

    try:
        model = WhisperModel(args.model, device="auto", compute_type="int8")
        segments, _info = model.transcribe(
            args.file,
            language=args.language or None,
            initial_prompt=args.prompt or None,
            vad_filter=True,
        )
        text = " ".join(segment.text.strip() for segment in segments).strip()
        print(json.dumps({"text": text, "model": args.model}))
    except Exception as exc:
        print(json.dumps({"error": str(exc)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
