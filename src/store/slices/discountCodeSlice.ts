import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddDiscountCodeModel } from "../../models/Requests/DiscountCode/AddDiscountCodeModel";
import DiscountCodeService from "../../services/discountCodeService";
import { UpdateDiscountCodeModel } from "../../models/Requests/DiscountCode/UpdateDiscountCodeModel";
import discountCodeService from "../../services/discountCodeService";

export const fetchDiscountCodes = createAsyncThunk(
  "discountCodes/fetchDiscountCodes",
  async (_, thunkAPI) => {
    try {
      const allDiscountCodes = await discountCodeService.getAll();

      return allDiscountCodes.data.response;

    } catch (error) {
      console.error("Error fetching discountcodes:", error);
      throw error;
    }
  }
);

export const getByIdDiscountCode = createAsyncThunk(
  "discountCodes/getByIdDiscountCodes",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await discountCodeService.getById(id);
      return getByIded.data.response;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw error;
    }
  }
);

export const addDiscountCode = createAsyncThunk(
  "discountCodes/addDiscountCode",
  async (newDiscountCodeData: AddDiscountCodeModel, thunkAPI) => {
    try {
      const addedDiscountCode = await discountCodeService.add(newDiscountCodeData);

      return addedDiscountCode.data;

    } catch (error: any ) {
      if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 2012) {
        const details = error.response.data.response.details[0];
        throw details;
      } 
    }
  }
);

export const updateDiscountCode = createAsyncThunk(
  "discountCodes/updateDiscountCode",
  async (updatedDiscountCodeData: UpdateDiscountCodeModel, thunkAPI) => {
    try {
      const updatedDiscountCode = await discountCodeService.update(updatedDiscountCodeData);
      if (updatedDiscountCode.data) {
        return updatedDiscountCode.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } catch (error : any) {
      if (error && error.response && error.response.data.response.errorCode === 2012) {
        const details = error.response.data.response.details[0];
       throw details;
    }
    }
  }
);

export const deleteDiscountCode = createAsyncThunk(
  "discountCodes/deleteDiscountCode",
  async ({ discountCodeId }: { discountCodeId: number; }, thunkAPI) => {
    try {
      await discountCodeService.delete(discountCodeId);
      return {
        deletedDiscountCodeId: discountCodeId
      };
    } catch (error) {
      console.error("Error deleting discountcode:", error);
      throw error;
    }
  }
);



const discountCodeSlice = createSlice({
  name: "discountCodes",
  initialState: { discountCodes: [] as any[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchDiscountCodes.pending, (state) => { });
    builder.addCase(fetchDiscountCodes.fulfilled, (state, action) => {
      state.discountCodes = action.payload;
    });
    builder.addCase(fetchDiscountCodes.rejected, (state) => { });

    /*-----------------*/
    builder.addCase(getByIdDiscountCode.pending, (state) => { });
    builder.addCase(getByIdDiscountCode.fulfilled, (state, action) => {
        state.discountCodes = action.payload;});
    builder.addCase(getByIdDiscountCode.rejected, (state) => {
    });


    /*-----------------*/

    builder.addCase(addDiscountCode.pending, (state) => { });
    builder.addCase(addDiscountCode.fulfilled, (state, action) => {
      state.error = null;
      state.discountCodes.push(action.payload);
    });
    builder.addCase(addDiscountCode.rejected, (state, action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*-----------------*/

    builder.addCase(updateDiscountCode.pending, (state) => { });
    builder.addCase(updateDiscountCode.fulfilled, (state, action) => {
      state.error = null;
      state.discountCodes = [];
    });
    builder.addCase(updateDiscountCode.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

    /*-----------------*/

    builder.addCase(deleteDiscountCode.pending, (state) => { });
    builder.addCase(deleteDiscountCode.fulfilled, (state, action) => {
      const deletedDiscountCodeId = action.payload.deletedDiscountCodeId;
      state.discountCodes = state.discountCodes.filter(discountCode => discountCode.id !== deletedDiscountCodeId);
    });
    builder.addCase(deleteDiscountCode.rejected, (state) => { });
  },

});

export const discountCodeReducer = discountCodeSlice.reducer;
export const { } = discountCodeSlice.actions;