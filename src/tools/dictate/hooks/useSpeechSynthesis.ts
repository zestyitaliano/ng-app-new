import { useCallback, useEffect, useState } from "react";

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text) return;

      window.speechSynthesis.cancel();

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";

      if (!plainText.trim()) return;

      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = rate;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, rate],
  );

  const stop = useCallback(() => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const toggleSpeaking = useCallback(
    (text: string) => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, speak, stop],
  );

  return { isSpeaking, toggleSpeaking, stop, rate, setRate, isSupported };
};
