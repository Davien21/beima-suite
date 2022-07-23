import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  contractsReducer,
  modalReducer,
  uploadReducer,
  authReducer,
} from "./slices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { authApi } from "services/authService";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["upload", "modal", "user"],
  // whiteList: ["contract"],
};

const rootReducer = combineReducers({
  contracts: contractsReducer,
  upload: uploadReducer,
  modal: modalReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, descriptions: descriptionsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
