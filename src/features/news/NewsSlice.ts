import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../app/store";
import { getNews, INews } from "./fakeRest";

export interface StateNews {
  newList: INews[] | null;
  suscripIdList: number[];
}

const initialState: StateNews = {
  newList: null,
  suscripIdList: [],
};

export const getNewListAsync = createAsyncThunk("getNoticias", async () => {
  const newList = await getNews();
  return newList;
});

const newList = createSlice({
  name: "news",
  initialState,
  reducers: {
    addSubscription: (state, action: PayloadAction<number>) => {
      state.suscripIdList = [...state.suscripIdList, action.payload];
    },
    cleanList: (state) => {
      state.suscripIdList = initialState.suscripIdList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewListAsync.fulfilled, (state, action) => {
      const list: number[] = action.payload
        .filter((news) => news.isPremium)
        .map((news) => news.id);
      state.newList = action.payload;
      state.suscripIdList = list;
    });
  },
});

export const getNewList = () => (dispatch: AppDispatch) => {
  return dispatch(getNewListAsync());
};

export const { addSubscription, cleanList } = newList.actions;

export default newList.reducer;