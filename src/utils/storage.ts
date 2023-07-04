export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key) || "";
  try {
    return JSON.parse(data);
  } catch (err: unknown) {
    return data;
  }
};

export const setItem = (key: string, value: string) => {
  let data = "";
  if (typeof value === "object") {
    data = JSON.stringify(value);
  }
  return window.localStorage.setItem(key, data);
};

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export const removeAllItem = () => {
  window.localStorage.clear();
};
