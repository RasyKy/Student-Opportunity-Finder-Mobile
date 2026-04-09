import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "@opportcam:selected-interests:v1";

export const defaultSelectedInterestIds = [
  "scholarships",
  "internships",
  "web-dev",
  "social-work",
  "arts",
];

const selectedInterestStore = new Set(defaultSelectedInterestIds);
const listeners = new Set<() => void>();

let selectedInterestsSnapshot = Array.from(selectedInterestStore);
let hydrationPromise: Promise<void> | null = null;
let hasHydrated = false;
let hasLocalMutation = false;

function emitChange() {
  selectedInterestsSnapshot = Array.from(selectedInterestStore);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return selectedInterestsSnapshot;
}

function getServerSnapshot() {
  return selectedInterestsSnapshot;
}

function normalizeIds(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return defaultSelectedInterestIds;
  }

  const ids = input.filter(
    (value): value is string => typeof value === "string",
  );

  if (ids.length === 0) {
    return defaultSelectedInterestIds;
  }

  return Array.from(new Set(ids));
}

async function persistSelectedInterests() {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(selectedInterestStore)),
    );
  } catch {
    // Ignore persistence errors and keep in-memory state usable.
  }
}

async function hydrateSelectedInterests() {
  if (hasHydrated) {
    return;
  }

  if (hydrationPromise) {
    return hydrationPromise;
  }

  hydrationPromise = (async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      if (!raw || hasLocalMutation) {
        return;
      }

      const parsed = JSON.parse(raw);
      const ids = normalizeIds(parsed);

      selectedInterestStore.clear();
      ids.forEach((id) => selectedInterestStore.add(id));
    } catch {
      // Ignore hydration errors and continue with defaults.
    } finally {
      hasHydrated = true;
      hydrationPromise = null;
      emitChange();
    }
  })();

  return hydrationPromise;
}

export function useUserInterests() {
  const selectedIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    void hydrateSelectedInterests();
  }, []);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const isSelected = useCallback(
    (id: string) => selectedIdSet.has(id),
    [selectedIdSet],
  );

  const setSelectedIds = useCallback((ids: Iterable<string>) => {
    hasLocalMutation = true;

    selectedInterestStore.clear();
    for (const id of ids) {
      selectedInterestStore.add(id);
    }

    emitChange();
    void persistSelectedInterests();
  }, []);

  const toggleInterest = useCallback((id: string) => {
    hasLocalMutation = true;

    if (selectedInterestStore.has(id)) {
      selectedInterestStore.delete(id);
      emitChange();
      void persistSelectedInterests();
      return false;
    }

    selectedInterestStore.add(id);
    emitChange();
    void persistSelectedInterests();
    return true;
  }, []);

  return {
    selectedIds,
    selectedIdSet,
    selectedCount: selectedIds.length,
    isSelected,
    setSelectedIds,
    toggleInterest,
  };
}
