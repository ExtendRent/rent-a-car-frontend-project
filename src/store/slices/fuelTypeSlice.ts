import { UpdateFuelTypeModel } from './../../models/Requests/UpdateFuelTypeModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddFuelTypeModel } from '../../models/Requests/AddFuelTypeModel';
import FuelTypeService from '../../services/fuelTypeService';


export const fetchFuelType = createAsyncThunk(
    "fuelTypes/fetchFuelTypes",
    async(_,thunkAPI) => {
        try{
            const service : FuelTypeService = new FuelTypeService();
            const allFuelTypes = await service.getAll();
            return allFuelTypes.data.response;
        }
        catch(error){
            console.error("Error fetching Fuel Types:", error);
            throw error;
        }
    }
)

export const addFuelType = createAsyncThunk(
    "fuelTypes/addFuelTypes",
    async(newFuelTypeData: AddFuelTypeModel, thunkAPI) => {
        try{
            const service: FuelTypeService = new FuelTypeService();
            const addedFuelType = await service.add(newFuelTypeData);
            console.log(addedFuelType);
            return addedFuelType.data;
        }
        catch (error){
            console.error("Error adding fuel types", error);
            throw error;
        }
    }
);

export const updateFuelType = createAsyncThunk(
    "fuelTypes/updateFuelTypes",
    async(updatedFuelTypeData : UpdateFuelTypeModel, thunkAPI) => {
        try{
            const service: FuelTypeService = new FuelTypeService();
            const updateFuelType = await service.update(updatedFuelTypeData);
            return updateFuelType.data.response;
        }catch(error){
            console.error("Error updating fuel type:", error);
            throw error;
        }
    }
)

export const deleteFuelType = createAsyncThunk(
    "fuelTypes/deleteFuelTypes",
    async({ fuelTypeId } : { fuelTypeId: number;}, thunkAPI) => {
        try{
            const service : FuelTypeService = new FuelTypeService();
            await service.delete(fuelTypeId);
            return{
                deletedFuelTypeId: fuelTypeId
            } 
        }catch(error){
            console.error("Error deleting fuel type", error)
            throw error;
        }
    }
)

const fuelTypeSlice = createSlice({
    name: "fuelType",
    initialState: {fuelTypes : [] as any [], error: null},
    reducers:{},
    extraReducers: (builder) => {

        /*-----------------------------------------------------------------*/

        builder.addCase(addFuelType.pending, (state) => {});
        builder.addCase(addFuelType.fulfilled, (state, action) => {
            state.fuelTypes.push(action.payload);
        });
        builder.addCase(addFuelType.rejected, (state) => {});

        /*-----------------------------------------------------------------*/

        builder.addCase(fetchFuelType.pending, (state) => {});
        builder.addCase(fetchFuelType.fulfilled, (state, action) => {
            state.fuelTypes = action.payload;
        })
        builder.addCase(fetchFuelType.rejected, (state) => {})

        /*-----------------------------------------------------------------*/

        builder.addCase(updateFuelType.pending, (state) => {});
        builder.addCase(updateFuelType.fulfilled, (state, action) => {
            state.fuelTypes = [];
        })
        builder.addCase(updateFuelType.rejected, (state) => {});

        /*-----------------------------------------------------------------*/

        builder.addCase(deleteFuelType.pending, (state) => {});
        builder.addCase(deleteFuelType.fulfilled, (state, action) => {
            const deletedFuelTypeId = action.payload.deletedFuelTypeId;
            state.fuelTypes = state.fuelTypes.filter(fuelType => fuelType.id !== deletedFuelTypeId)
        });
        builder.addCase(deleteFuelType.rejected, (state) => {});
    }
})

export const fuelTypeReducer = fuelTypeSlice.reducer;
export const {} = fuelTypeSlice.actions;