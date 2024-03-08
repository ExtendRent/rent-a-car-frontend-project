import { createSlice } from "@reduxjs/toolkit";

let requestCount = 0;

export const addRequest = () => {
  requestCount++;
};

export const removeRequest = () => {
  requestCount--;

  if (requestCount < 0) requestCount = 0;
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: 0,
  reducers: {},
  extraReducers: (builder) => {
	builder
	  .addMatcher(
		(action) => action.type.endsWith("/pending"),
		(state) => {
		  return state + 1;
		}
	  )
	  .addMatcher(
		(action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
		(state) => {
		  return state - 1;
		}
	  );
  }
});

export const loadingReducer = loadingSlice.reducer;