export default function LocalStorage() {
  //check if window is defined
  const isBrowser = (() => typeof window !== "undefined")();

  //return item from localStorage
  const getItem = (key: string) => {
    return isBrowser ? window.localStorage.getItem(key) : "";
  };

  //set item on localStorage
  const setItem = (key: string, value: string) => {
    if (isBrowser) {
      window.localStorage.setItem(key, value);
      return true;
    }

    return false;
  };

  //delete item from sessionStorage
  const deleteItem = (key: string) => {
    return window.localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    deleteItem,
  };
}
