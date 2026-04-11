import { useCallback, useEffect, useRef, useState } from "react";

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: null | (() => void);
  onend: null | (() => void);
  onerror: null | ((event: { error?: string }) => void);
  onresult:
    | null
    | ((event: {
        resultIndex: number;
        results: ArrayLike<
          ArrayLike<{
            transcript: string;
          }> & { isFinal?: boolean }
        >;
      }) => void);
  start: () => void;
  stop: () => void;
};

type BrowserSpeechRecognitionCtor = new () => BrowserSpeechRecognition;

const getSpeechRecognitionCtor = (): BrowserSpeechRecognitionCtor | null => {
  if (typeof window === "undefined") return null;

  const candidate =
    (window as typeof window & {
      SpeechRecognition?: BrowserSpeechRecognitionCtor;
      webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
    }).SpeechRecognition ||
    (window as typeof window & {
      SpeechRecognition?: BrowserSpeechRecognitionCtor;
      webkitSpeechRecognition?: BrowserSpeechRecognitionCtor;
    }).webkitSpeechRecognition;

  return candidate ?? null;
};

const getFriendlyError = (code?: string) => {
  switch (code) {
    case "audio-capture":
      return "No microphone was found. Check your device input and try again.";
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone permission is blocked for this page. Allow access in your browser and try again.";
    case "network":
      return "Speech recognition hit a network issue. Try again in a moment.";
    case "no-speech":
      return "No speech was detected. Try speaking a little closer to your microphone.";
    case "aborted":
      return null;
    default:
      return "Speech recognition failed in this browser session. Try again or switch to Chrome or Edge.";
  }
};

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const shouldResumeRef = useRef(false);

  useEffect(() => {
    const RecognitionCtor = getSpeechRecognitionCtor();

    if (
      !RecognitionCtor ||
      typeof window === "undefined" ||
      !window.isSecureContext
    ) {
      setIsSupported(false);
      setError(
        "Live speech recognition requires a secure browser context and support for the Web Speech API. Try Chrome or Edge on HTTPS or localhost.",
      );
      return;
    }

    const recognition = new RecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setError(null);
      setIsListening(true);
      setIsTranscribing(false);
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let liveText = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const chunk = result?.[0]?.transcript ?? "";

        if (result?.isFinal) {
          finalText += chunk;
        } else {
          liveText += chunk;
        }
      }

      if (finalText.trim()) {
        setTranscript((prev) => {
          const spacer = prev.trim().length > 0 ? " " : "";
          return `${prev}${spacer}${finalText.trim()}`;
        });
      }

      setInterimTranscript(liveText.trim());
    };

    recognition.onerror = (event) => {
      const message = getFriendlyError(event.error);

      if (message) {
        setError(message);
      }

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        shouldResumeRef.current = false;
      }

      setIsListening(false);
      setIsTranscribing(false);
    };

    recognition.onend = () => {
      const shouldResume = shouldResumeRef.current;

      setIsListening(false);
      setIsTranscribing(false);
      setInterimTranscript("");

      if (shouldResume) {
        try {
          recognition.start();
        } catch {
          shouldResumeRef.current = false;
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldResumeRef.current = false;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback(async () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setError(
        "Speech recognition is unavailable in this browser context. Try Chrome or Edge on HTTPS or localhost.",
      );
      return;
    }

    setError(null);
    setInterimTranscript("");
    setIsTranscribing(false);
    shouldResumeRef.current = true;

    try {
      recognition.start();
    } catch {
      setError("Speech recognition is already starting. Give it a moment and try again.");
    }
  }, []);

  const stopListening = useCallback(() => {
    shouldResumeRef.current = false;
    setInterimTranscript("");
    setIsTranscribing(false);
    recognitionRef.current?.stop();
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      void startListening();
    }
  }, [isListening, startListening, stopListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    isListening,
    isTranscribing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    setTranscript,
    error,
    isSupported,
  };
};
