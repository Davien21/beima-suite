import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contractsReducer from "./slices/contractSlice";
import uploadReducer from "./slices/uploadSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import modalReducer from "./slices/modalSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["upload", "modal"],
  // whiteList: ["contract"],
};

const rootReducer = combineReducers({
  contracts: contractsReducer,
  upload: uploadReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, descriptions: descriptionsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
