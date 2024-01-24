import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShowRentalModel } from "../../models/Requests/ShowRental";
import ShowRentalService from "../../services/showRentalService";


export const addShowRental = createAsyncThunk(
    "rental/showRental",
    async (showRentalData: ShowRentalModel     
      , thunkAPI) => {
      try {
        const service: ShowRentalService = new ShowRentalService();
        const addedShowRental = await service.add(showRentalData);
        return addedShowRental.data;
      } catch (error) {
        console.error("Error adding addedShowRental:", error);
        throw error;
      }
    }
  );

const showRentalSlice = createSlice({
    name: "showRental",
    initialState: { showRental: [] as any[],error:null },
    reducers: {},
    extraReducers: (builder) => {
     
  
      builder.addCase(addShowRental.pending, (state) => {});
      builder.addCase(addShowRental.fulfilled, (state, action) => {
        state.showRental.push(action.payload);
        
      });
      builder.addCase(addShowRental.rejected, (state) => {
        
      });
  
    },
  });
  
  export const showRentalReducer = showRentalSlice.reducer;
  export const {} = showRentalSlice.actions;