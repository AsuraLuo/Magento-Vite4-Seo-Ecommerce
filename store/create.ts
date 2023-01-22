import {
  configureStore,
  combineReducers,
  ReducersMapObject,
} from "@reduxjs/toolkit";

import { reducer as appReducer } from "./app";
import { reducer as i18nReducer } from "./i18n";

const reducer: ReducersMapObject = {
  app: appReducer,
  i18n: i18nReducer,
};

export const createStore = (PRELOADED_STATE?: any) => {
  const store = configureStore({
    reducer: combineReducers(reducer),
    preloadedState: PRELOADED_STATE,
  });

  return store;
};
