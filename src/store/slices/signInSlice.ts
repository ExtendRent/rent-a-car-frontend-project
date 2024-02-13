import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInModel } from "../../models/Requests/SignIn/SignInModel";
import SignInService from "../../services/signInService";
/* const parseJwt = (token:string) => {
  if (!token) {
    console.error("Token is undefined.");
    return null;
  }
  const [header, payload, signature] = token.split('.');
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
}; */
export const addSignIn = createAsyncThunk(
    "signin/addSignIn",
    async (addSignInData: SignInModel     
      , thunkAPI) => {
      try {
        const service: SignInService = new SignInService();
        const addedSignIn = await service.add(addSignInData);
        const token = addedSignIn.data.response.token;
        
        localStorage.setItem("token", token);
        //thunkAPI.dispatch({ type: "setDecodedToken", payload: decodedToken });
        return addedSignIn.data;
      } catch (error) {
        console.error("Error adding addedSignIn:", error);
        throw error;
      }
    }
  );
const signInSlice = createSlice({
    name: "signIn",
    initialState: { signIn: [] as any[],error:null ,decodedToken: null},
    reducers: {
      setDecodedToken: (state, action) => {
        state.decodedToken = action.payload;
      },
    },
    extraReducers: (builder) => {
     
  
      builder.addCase(addSignIn.pending, (state) => {});
      builder.addCase(addSignIn.fulfilled, (state, action) => {
        state.signIn.push(action.payload);
      });
      builder.addCase(addSignIn.rejected, (state) => {
        
      });
    },
  });
  export const { setDecodedToken } = signInSlice.actions;
  export const signInReducer = signInSlice.reducer;