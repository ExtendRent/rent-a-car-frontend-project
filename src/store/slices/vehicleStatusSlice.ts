import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VehicleStatusService from '../../services/vehicleStatusService';
import { UpdateVehicleStatusModel } from '../../models/Requests/VehicleStatus/UpdateVehicleStatusModel';
import vehicleStatusService from '../../services/vehicleStatusService';

export const fetchVehicleStatus = createAsyncThunk(
    "vehicleStatuses/fetchVehicleStatuses",
    async (_, thunkAPI) => {
        try {

            const allVehicleStatuses = await vehicleStatusService.getAll();
            return allVehicleStatuses.data.response;
        } catch (error) {
            console.error("Error fetching vehicle statuses: ", error);
            throw error;
        }
    }
)

export const getByIdVehicleStatus = createAsyncThunk(
    "vehicleStatuses/getByIdVehicleStatuses",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await vehicleStatusService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const updateVehicleStatus = createAsyncThunk(
    "vehicleStatuses/updateVehicleStatuses",
    async (updatedVehicleStatusData: UpdateVehicleStatusModel, thunkAPI) => {
        try {
            return (await vehicleStatusService.update(updatedVehicleStatusData)).data.response;
        } catch (error) {
            console.error("Error updating vehicle status: ", error);
            throw error;
        }
    }
)

const vehicleStatusSlice = createSlice({
    name: "vehicleStatus",
    initialState: { vehicleStatuses: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        /*-----------------*/

        builder.addCase(fetchVehicleStatus.pending, (state) => { });
        builder.addCase(fetchVehicleStatus.fulfilled, (state, action) => {
            state.vehicleStatuses = action.payload;
        });
        builder.addCase(fetchVehicleStatus.rejected, (state) => { });

        /*-----------------*/

        builder.addCase(getByIdVehicleStatus.pending, (state) => { });
        builder.addCase(getByIdVehicleStatus.fulfilled, (state, action) => {
            state.vehicleStatuses = action.payload;
        });
        builder.addCase(getByIdVehicleStatus.rejected, (state) => {
        });
        
        /*-----------------*/

        builder.addCase(updateVehicleStatus.pending, (state) => { });
        builder.addCase(updateVehicleStatus.fulfilled, (state, action) => {
            state.vehicleStatuses = [];
        });
        builder.addCase(updateVehicleStatus.rejected, (state) => { });

        /*----------------*/


    }
})
export const vehicleStatusReducer = vehicleStatusSlice.reducer;
export const { } = vehicleStatusSlice.actions;