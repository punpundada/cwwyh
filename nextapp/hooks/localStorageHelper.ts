"use client";

const localStorageHelper = <T = unknown,>(key: string) => {
  const setValue = (val: T) => {
    if(!window) return
    try {
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = ():(T | null) => {
    if(!window) return null
      try {
          const item =window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(error);
        return null;
      }
  };

  const clearValue = () => {
    if(!window) return
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(error);
      }
  };

  return { setValue, getValue, clearValue };
};

export default localStorageHelper;
