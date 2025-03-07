import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./reducers/storeSlice"; 
import skuReducer from './reducers/skuSlice'

export const store = configureStore({
  reducer: {
    stores: storeReducer, 
    skus:skuReducer,
  },
});

// Define RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
