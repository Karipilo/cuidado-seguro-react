const memoryStore = new Map();

export const getMemoryItem = (key) => {
  if (!memoryStore.has(key)) {
    return null;
  }

  return memoryStore.get(key);
};

export const setMemoryItem = (key, value) => {
  memoryStore.set(key, value);
};

export const removeMemoryItem = (key) => {
  memoryStore.delete(key);
};

export const getMemoryJSON = (key, fallback = null) => {
  const value = getMemoryItem(key);

  if (value == null) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const setMemoryJSON = (key, value) => {
  setMemoryItem(key, JSON.stringify(value));
};
