import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // Keep localStorage errors as console.error for debugging storage issues
        console.error(`Error reading localStorage key "${key}":`, error);
      }
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  };

  return [storedValue, setValue, removeValue] as const;
}
