import { useCallback, useRef, useState } from "react";

interface HistoryState {
  past: string[];
  present: string;
  future: string[];
}

export function useHistory(initialState: string) {
  const [state, setState] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: [],
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (state.past.length === 0) return null;

    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);

    setState({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
    });

    return previous;
  }, [state]);

  const redo = useCallback(() => {
    if (state.future.length === 0) return null;

    const next = state.future[0];
    const newFuture = state.future.slice(1);

    setState({
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
    });

    return next;
  }, [state]);

  const record = useCallback((newPresent: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setState((curr) => {
      if (curr.present === newPresent) return curr;

      const newPast = [...curr.past, curr.present];
      if (newPast.length > 100) {
        newPast.shift();
      }

      return {
        past: newPast,
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const debouncedRecord = useCallback(
    (newPresent: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        record(newPresent);
      }, 500);
    },
    [record],
  );

  return { undo, redo, record, debouncedRecord, canUndo, canRedo };
}
