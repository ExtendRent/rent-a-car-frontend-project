import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddShiftTypeModel } from "../../models/Requests/ShiftType/AddShiftTypeModel";
import { UpdateShiftTypeModel } from "../../models/Requests/ShiftType/UpdateShiftTypeModel";
import shiftTypeService from "../../services/shiftTypeService";
import { stat } from "fs";


export const fetchShiftTypes = createAsyncThunk(
  "shiftTypes/fetchShiftTypes",
  async (_, thunkAPI) => {
    try {
      const allShiftTypes = await shiftTypeService.getAll();
      return allShiftTypes.data.response;

    } catch (error) {
      console.error("Error fetching shiftTypes:", error);
      throw error;
    }
  }
);

export const getByIdShiftType = createAsyncThunk(
  "shiftTypes/getByIdShiftType",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await shiftTypeService.getById(id);
      return getByIded.data.response;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw error;
    }
  }
);


export const addShiftType = createAsyncThunk(
  "shiftTypes/addShiftType",
  async (newShiftTypeData: AddShiftTypeModel, thunkAPI) => {
    try {
      const addedShiftType = await shiftTypeService.add(newShiftTypeData);
      console.log(addedShiftType);

      return addedShiftType.data;
    } catch (error : any) {
      if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 3000) {
        const details = error.response.data.response.details[0];
        throw details;
      } 
    }
  });

export const updateShiftType = createAsyncThunk(
  "shiftTypes/updateShiftType",
  async (updatedShiftTypeData: UpdateShiftTypeModel, thunkAPI) => {
    try {
      const updatedShiftType = await shiftTypeService.update(updatedShiftTypeData);
      if (updatedShiftType.data) {
        return updatedShiftType.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } catch (error: any) {
            
      if (error && error.response && error.response.data.response.errorCode === 3000) {
          const details = error.response.data.response.details[0];
         throw details;
      }
      
    }
  }
);

export const deleteShiftType = createAsyncThunk(
  "shiftTypes/deleteshiftType",
  async ({ shiftTypeId }: { shiftTypeId: number; }, thunkAPI) => {
    try {
      await shiftTypeService.delete(shiftTypeId);
      return {
        deletedShiftType: shiftTypeId
      };
    } catch (error) {
      console.error("Error deleting shifttype:", error);
      throw error;
    }
  }
);



const shiftTypeSlice = createSlice({
  name: "shiftType",
  initialState: { shiftTypes: [] as any[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchShiftTypes.pending, (state) => { });
    builder.addCase(fetchShiftTypes.fulfilled, (state, action) => {
      state.shiftTypes = action.payload;
    });
    builder.addCase(fetchShiftTypes.rejected, (state) => { });

    /*-----------------*/
    builder.addCase(getByIdShiftType.pending, (state) => { });
    builder.addCase(getByIdShiftType.fulfilled, (state, action) => {
      state.shiftTypes = action.payload;
    });
    builder.addCase(getByIdShiftType.rejected, (state) => {
    });

    /*-----------------*/

    builder.addCase(addShiftType.pending, (state) => { });
    builder.addCase(addShiftType.fulfilled, (state, action) => {
      state.error = null;
      state.shiftTypes.push(action.payload);
    });
    builder.addCase(addShiftType.rejected, (state, action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*-----------------*/

    builder.addCase(updateShiftType.pending, (state) => { });
    builder.addCase(updateShiftType.fulfilled, (state, action) => {
      state.error = null;
      state.shiftTypes = [];
    });
    builder.addCase(updateShiftType.rejected, (state, action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*-----------------*/

    builder.addCase(deleteShiftType.pending, (state) => { });
    builder.addCase(deleteShiftType.fulfilled, (state, action) => {
      const deletedShiftTypeId = action.payload.deletedShiftType;
      state.shiftTypes = state.shiftTypes.filter(shiftType => shiftType.id !== deletedShiftTypeId);
    });
    builder.addCase(deleteShiftType.rejected, (state) => { });
  }
});

export const shiftTypeReducer = shiftTypeSlice.reducer;
export const { } = shiftTypeSlice.actions;