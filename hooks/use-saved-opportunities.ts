import { useCallback, useMemo, useSyncExternalStore } from "react";

import { defaultSavedIds } from "../data/mock-opportunities";

const savedIdsStore = new Set(defaultSavedIds);
const listeners = new Set<() => void>();
let savedIdsSnapshot = Array.from(savedIdsStore);

function emitChange() {
  savedIdsSnapshot = Array.from(savedIdsStore);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return savedIdsSnapshot;
}

function getServerSnapshot() {
  return savedIdsSnapshot;
}

export function useSavedOpportunities() {
  const savedIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const savedIdSet = useMemo(() => new Set(savedIds), [savedIds]);

  const isSaved = useCallback((id: string) => savedIdSet.has(id), [savedIdSet]);

  const saveOpportunity = useCallback((id: string) => {
    if (savedIdsStore.has(id)) {
      return;
    }

    savedIdsStore.add(id);
    emitChange();
  }, []);

  const removeOpportunity = useCallback((id: string) => {
    if (!savedIdsStore.has(id)) {
      return;
    }

    savedIdsStore.delete(id);
    emitChange();
  }, []);

  const toggleSaved = useCallback((id: string) => {
    if (savedIdsStore.has(id)) {
      savedIdsStore.delete(id);
      emitChange();
      return false;
    }

    savedIdsStore.add(id);
    emitChange();
    return true;
  }, []);

  return {
    savedIds,
    savedIdSet,
    isSaved,
    saveOpportunity,
    removeOpportunity,
    toggleSaved,
  };
}
