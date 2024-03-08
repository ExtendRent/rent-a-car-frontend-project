import { useDispatch } from "react-redux";

import type { AppDispatch } from "./configureStore";

export function useAppDispatch(){
  return useDispatch<AppDispatch>();
}