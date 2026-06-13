const memoryStore = new Map();

export const getMemoryItem = (key) => {
  if (memoryStore.has(key)) {
    return memoryStore.get(key);
  }
  try {
    const val = sessionStorage.getItem(key);
    if (val !== null) {
      memoryStore.set(key, val);
      return val;
    }
  } catch {
    // Session storage is disabled or unavailable
  }
  return null;
};

export const setMemoryItem = (key, value) => {
  memoryStore.set(key, value);
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Session storage is disabled or unavailable
  }
};

export const removeMemoryItem = (key) => {
  memoryStore.delete(key);
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Session storage is disabled or unavailable
  }
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
