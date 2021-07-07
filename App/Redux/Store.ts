import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import MainReducer from "./CombineReducer";
import thunk from "redux-thunk";

export const store = createStore(
  MainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type initialState = ReturnType<typeof store.getState>;
