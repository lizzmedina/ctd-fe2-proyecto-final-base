import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import citaReducer from "../features/quote/citaSlice";
import newsReducer from '../features/news/NewsSlice';

export const store = configureStore({
  reducer: {
    cita: citaReducer,
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
