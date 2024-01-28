import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddDiscountCodeModel } from "../../models/Requests/AddDiscountCodeModel";
import DiscountCodeService from "../../services/discountCodeService";
import { UpdateDiscountCodeModel } from "../../models/Requests/UpdateDiscountCodeModel";

export const fetchDiscountCodes = createAsyncThunk(
    "discountCodes/fetchDiscountCodes",
    async (_, thunkAPI) => {
      try {
        const service: DiscountCodeService = new DiscountCodeService();
        const allDiscountCodes = await service.getAll();
        
        return allDiscountCodes.data.response;
  
      } catch (error) {
        console.error("Error fetching discountcodes:", error);
        throw error;
      }
    }
  );

export const addDiscountCode = createAsyncThunk(
    "discountCodes/addDiscountCode",
    async (newDiscountCodeData: AddDiscountCodeModel, thunkAPI) => {
      try {
        const service: DiscountCodeService = new DiscountCodeService();
        const addedDiscountCode = await service.add(newDiscountCodeData);
  
        return addedDiscountCode.data;
  
      } catch (error) {
        console.error("Error adding discountcode:", error);
        throw error;
      }
    }
  );

  export const updateDiscountCode = createAsyncThunk(
    "discountCodes/updateDiscountCode",
    async (updatedDiscountCodeData: UpdateDiscountCodeModel, thunkAPI) => {
      try {
  
        const service: DiscountCodeService = new DiscountCodeService();
        const updatedDiscountCode = await service.update(updatedDiscountCodeData);
        if (updatedDiscountCode.data) {
          return updatedDiscountCode.data.response;
        }
        else {
          console.warn("Server response does not contain data.");
          return null;
        }
      } catch (error) {
        console.error("Error updating discountcode:", error);
        throw error;
      }
    }
  );

  export const deleteDiscountCode = createAsyncThunk(
    "discountCodes/deleteDiscountCode",
    async ({ discountCodeId }: { discountCodeId: number; }, thunkAPI) => {
      try {
        const service: DiscountCodeService = new DiscountCodeService();
        await service.delete(discountCodeId);
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
    initialState: { discountCodes: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchDiscountCodes.pending, (state) => { });
    builder.addCase(fetchDiscountCodes.fulfilled, (state, action) => {
      state.discountCodes = action.payload;
      });

    builder.addCase(fetchDiscountCodes.rejected, (state) => { });

        builder.addCase(addDiscountCode.pending, (state) => { });
    builder.addCase(addDiscountCode.fulfilled, (state, action) => {
      state.discountCodes.push(action.payload);
    });
    builder.addCase(addDiscountCode.rejected, (state) => { });

    builder.addCase(updateDiscountCode.pending, (state) => {});
    builder.addCase(updateDiscountCode.fulfilled, (state, action) => {
      state.discountCodes = [];
    });
    builder.addCase(updateDiscountCode.rejected, (state) => {
      
    });

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