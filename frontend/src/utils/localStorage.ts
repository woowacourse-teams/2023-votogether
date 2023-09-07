export const getLocalStorage = <T>(key: string): T | null => {
  return JSON.parse(localStorage.getItem(key) || 'null');
};

export const setLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
