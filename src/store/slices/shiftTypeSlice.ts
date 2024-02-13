import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddShiftTypeModel } from "../../models/Requests/ShiftType/AddShiftTypeModel";
import ShiftTypeService from "../../services/shiftTypeService";
import { UpdateShiftTypeModel } from "../../models/Requests/ShiftType/UpdateShiftTypeModel";


export const fetchShiftTypes = createAsyncThunk(
  "shiftTypes/fetchShiftTypes",
  async (_, thunkAPI) => {
    try {
      const service: ShiftTypeService = new ShiftTypeService();
      const allShiftTypes = await service.getAll();
      return allShiftTypes.data.response;

    } catch (error) {
      console.error("Error fetching shiftTypes:", error);
      throw error;
    }
  }
);


export const addShiftType = createAsyncThunk(
  "shiftTypes/addShiftType",
  async (newShiftTypeData: AddShiftTypeModel, thunkAPI) => {
    try {
      const service: ShiftTypeService = new ShiftTypeService();
      const addedShiftType = await service.add(newShiftTypeData);
      console.log(addedShiftType);

      return addedShiftType.data;
    } catch (error) {
      console.error("Error adding shiftType:", error);
      throw error;
    }
  });

  export const updateShiftType = createAsyncThunk(
    "shiftTypes/updateShiftType",
    async (updatedShiftTypeData: UpdateShiftTypeModel, thunkAPI) => {
      try {
  
        const service: ShiftTypeService = new ShiftTypeService();
        const updatedShiftType = await service.update(updatedShiftTypeData);
        if (updatedShiftType.data) {
          return updatedShiftType.data.response;
        }
        else {
          console.warn("Server response does not contain data.");
          return null;
        }
      } catch (error) {
        console.error("Error updating shifttype:", error);
        throw error;
      }
    }
  );

  export const deleteShiftType = createAsyncThunk(
    "shiftTypes/deleteshiftType",
    async ({ shiftTypeId }: { shiftTypeId: number; }, thunkAPI) => {
      try {
        const service: ShiftTypeService = new ShiftTypeService();
        await service.delete(shiftTypeId);
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
  initialState: { shiftTypes: [] as any[], error: null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchShiftTypes.pending, (state) => { });
    builder.addCase(fetchShiftTypes.fulfilled, (state, action) => {
      state.shiftTypes = action.payload;
    });
    builder.addCase(fetchShiftTypes.rejected, (state) => { });


    builder.addCase(addShiftType.pending, (state) => { });
    builder.addCase(addShiftType.fulfilled, (state, action) => {
      state.shiftTypes.push(action.payload);
    });
    builder.addCase(addShiftType.rejected, (state) => { });

    builder.addCase(updateShiftType.pending, (state) => {});
    builder.addCase(updateShiftType.fulfilled, (state, action) => {
      state.shiftTypes = [];
    });
    builder.addCase(updateShiftType.rejected, (state) => {
      
    });

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