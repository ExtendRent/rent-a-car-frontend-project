import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShowRentalModel } from "../../models/Requests/ShowRental";
import ShowRentalService from "../../services/showRentalService";


/* export const addShowRental = createAsyncThunk(
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
  ); */
  /* export const addShowRental = createAsyncThunk('showRental/addShowRental', async (rentalData: ShowRentalModel, { dispatch }) => {
    try {
      const service: ShowRentalService = new ShowRentalService();
      const response = await service.add(rentalData); // api.addShowRental ile gerçek API çağrısını yapın
      return response.data;
    } catch (error) {
      // Hata yönetimi burada
      console.error('Error adding show rental:', error);
      throw error;
    }
  }); */
  export const addShowRental = createAsyncThunk(
    'showRental/addShowRental',
    async (rentalData: ShowRentalModel) => {
      try {
        const service: ShowRentalService = new ShowRentalService();
        const response = await service.add(rentalData);
        return response.data;
      } catch (error) {
        console.error('Error adding show rental:', error);
        throw error;
      }
    }
  );

const showRentalSlice = createSlice({
    name: "showRental",
    initialState: { showRental: [] as any[], error: null, rentalResponses: [] },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(addShowRental.pending, (state) => {});
      builder.addCase(addShowRental.fulfilled, (state, action) => {
        state.showRental.push(action.payload);
      });
      builder.addCase(addShowRental.rejected, (state) => {});
    },
  });
  
  export const showRentalReducer = showRentalSlice.reducer;
  export const {} = showRentalSlice.actions;




  