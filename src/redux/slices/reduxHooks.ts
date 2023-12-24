import {
  useDispatch as reduxUseDispatch,
  TypedUseSelectorHook,
  useSelector as reduxUseSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../store"; // Adjust the path as needed

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
