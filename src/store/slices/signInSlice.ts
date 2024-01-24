import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInModel } from "../../models/Requests/SignInModel";
import SignInService from "../../services/signInService";

export const addSignIn = createAsyncThunk(
    "signin/addSignIn",
    async (addSignInData: SignInModel     
      , thunkAPI) => {
      try {
        const service: SignInService = new SignInService();
        const addedSignIn = await service.add(addSignInData);
        return addedSignIn.data;
      } catch (error) {
        console.error("Error adding addedSignIn:", error);
        throw error;
      }
    }
  );
const signInSlice = createSlice({
    name: "signIn",
    initialState: { signIn: [] as any[],error:null },
    reducers: {},
    extraReducers: (builder) => {
     
  
      builder.addCase(addSignIn.pending, (state) => {});
      builder.addCase(addSignIn.fulfilled, (state, action) => {
        state.signIn.push(action.payload);
      });
      builder.addCase(addSignIn.rejected, (state) => {
        
      });
    },
  });
  
  export const signInReducer = signInSlice.reducer;
  export const {} = signInSlice.actions;