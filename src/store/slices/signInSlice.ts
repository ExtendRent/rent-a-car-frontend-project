
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInModel } from "../../models/Requests/SignIn/SignInModel";
import SignInService, { ErrorResponse } from "../../services/signInService";
import { SignInResponse } from "../../models/Responses/SignIn/SignInResponse";
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
  async (addSignInData: SignInModel, thunkAPI) => {
      try {
          const service: SignInService = new SignInService();
          const addedSignIn = await service.add(addSignInData);
          const token = addedSignIn.data.response.token;
          localStorage.setItem("token", token);
          return addedSignIn.data.response; // Response'u doğrudan döndürüyoruz
      } 
      catch (error: any) {
       
        if (error && error.response && (error.response.data.response.errorCode === 1 || error.response.data.response.errorCode === 1001)) {
          
          throw error.response.data.response.details[0];
          
        }
        
      }
  }
);
export const isUserTrue = createAsyncThunk(
  "signin/isUserTrue",
  async (isUserTrueData: {email : string,password:string}, thunkAPI) => {
      try {
          const service: SignInService = new SignInService();
          const addedisUserTrue = await service.isUserTrue(isUserTrueData);
  
          return addedisUserTrue.data; 
      } 
      catch (error) {
        console.error("Error adding signIn:", error);
        throw  error;
    }
  }
);
const signInSlice = createSlice({
    name: "signIn",
    initialState: { signIn: [] as any[],error: null as string | null ,decodedToken: null},
    reducers: {
      setDecodedToken: (state, action) => {
        state.decodedToken = action.payload;
      }
    },
    extraReducers: (builder) => {
     
  
      builder.addCase(addSignIn.pending, (state) => {});
      builder.addCase(addSignIn.fulfilled, (state, action) => {
        state.error=null;
        state.signIn.push(action.payload);
      });
      builder.addCase(addSignIn.rejected, (state, action) => {
      
        state.error = action.error.message || "Bir hata oluştu.";
      });

      builder.addCase(isUserTrue.pending, (state) => {});
      builder.addCase(isUserTrue.fulfilled, (state, action) => {
        state.signIn.push(action.payload);
      });
      builder.addCase(isUserTrue.rejected, (state, action) => {
        state.error = action.error.message || "Bir hata oluştu.";
      });
    },
  });
  export const { setDecodedToken } = signInSlice.actions;
  export const signInReducer = signInSlice.reducer;