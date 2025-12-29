import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/UserSlice";
import createSagaMiddleWare from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleWare=createSagaMiddleWare()
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // <-- FIXED
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }).concat(sagaMiddleWare),
});

export const persistor = persistStore(store);
