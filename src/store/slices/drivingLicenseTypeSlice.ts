import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddDrivingLicenseTypeModel } from "../../models/Requests/DrivingLicenseType/AddDrivingLicenseTypeModel";
import DrivingLicenseTypeModelService from "../../services/drivingLicenseTypeService";
import { UpdateDrivingLicenseTypeModel } from "../../models/Requests/DrivingLicenseType/UpdateDrivingLicenseTypeModel";

export const fetchDrivingLicenseTypes = createAsyncThunk(
    "drivingLicenseTypes/fetchDrivingLicenseTypes",
    async (_, thunkAPI) => {
      try {
        const service: DrivingLicenseTypeModelService = new DrivingLicenseTypeModelService();
        const allDrivingLicenseTypes = await service.getAll();
        return allDrivingLicenseTypes.data.response;
  
      } catch (error) {
        console.error("Error fetching allDrivingLicenseTypes:", error);
        throw error;
      }
    }
  );
export const addDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/addDrivingLicenseType",
    async (newDrivingLicenseTypeData: AddDrivingLicenseTypeModel, thunkAPI) => {
        try {
            const service: DrivingLicenseTypeModelService = new DrivingLicenseTypeModelService();
            const addedDrivingLicenseType = await service.add(newDrivingLicenseTypeData);

            return addedDrivingLicenseType.data;

        } catch (error) {
            console.error("Error adding drivingLicenseType:", error);
            throw error;
        }
    }
);

export const updateDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/updateDrivingLicenseType",
    async (updatedDrivingLicenseTypeData: UpdateDrivingLicenseTypeModel, thunkAPI) => {
        try {

            const service: DrivingLicenseTypeModelService = new DrivingLicenseTypeModelService();
            const updatedDrivingLicenseType = await service.update(updatedDrivingLicenseTypeData);
            if (updatedDrivingLicenseType.data) {
                return updatedDrivingLicenseType.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error) {
            console.error("Error updating drivingLicenseType:", error);
            throw error;
        }
    }
);

export const deleteDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/deleteDrivingLicenseType",
    async ({ drivingLicenseTypeId }: { drivingLicenseTypeId: number; }, thunkAPI) => {
        try {
            const service: DrivingLicenseTypeModelService = new DrivingLicenseTypeModelService();
            await service.delete(drivingLicenseTypeId);
            return {
                deletedDrivingLicenseTypeId: drivingLicenseTypeId
            };
        } catch (error) {
            console.error("Error deleting drivingLicenseType:", error);
            throw error;
        }
    }
);


const drivingLicenseTypeSlice = createSlice({
    name: "drivingLicenseType",
    initialState: { drivingLicenseTypes: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchDrivingLicenseTypes.pending, (state) => { });
    builder.addCase(fetchDrivingLicenseTypes.fulfilled, (state, action) => {
      state.drivingLicenseTypes = action.payload;
    });
    builder.addCase(fetchDrivingLicenseTypes.rejected, (state) => { });

        builder.addCase(addDrivingLicenseType.pending, (state) => { });
        builder.addCase(addDrivingLicenseType.fulfilled, (state, action) => {
            state.drivingLicenseTypes.push(action.payload);
        });
        builder.addCase(addDrivingLicenseType.rejected, (state) => { });

        builder.addCase(updateDrivingLicenseType.pending, (state) => { });
        builder.addCase(updateDrivingLicenseType.fulfilled, (state, action) => {
            state.drivingLicenseTypes = [];
        });
        builder.addCase(updateDrivingLicenseType.rejected, (state) => { });

        builder.addCase(deleteDrivingLicenseType.pending, (state) => { });
        builder.addCase(deleteDrivingLicenseType.fulfilled, (state, action) => {
            const deletedDrivingLicenseTypeId = action.payload.deletedDrivingLicenseTypeId;
            state.drivingLicenseTypes = state.drivingLicenseTypes.filter(drivingLicenseType => drivingLicenseType.id !== deletedDrivingLicenseTypeId);
        });
        builder.addCase(deleteDrivingLicenseType.rejected, (state) => { });

    }
});
export const drivingLicenseTypeReducer = drivingLicenseTypeSlice.reducer;
export const { } = drivingLicenseTypeSlice.actions;