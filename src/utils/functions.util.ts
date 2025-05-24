import { useState } from "react";

export const useSetState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState: any) => {
    setState((prevState: any) => ({ ...prevState, ...newState }));
  };

  return [state, newSetState];
};

export const validImgUrl = (url: string) => {
  try {
    new URL(url);
  } catch (_) {
    return false;
  }

  return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url);
};
