import { UpdateFuelTypeModel } from '../../models/Requests/FuelType/UpdateFuelTypeModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddFuelTypeModel } from '../../models/Requests/FuelType/AddFuelTypeModel';
import FuelTypeService from '../../services/fuelTypeService';
import fuelTypeService from '../../services/fuelTypeService';


export const fetchFuelType = createAsyncThunk(
    "fuelTypes/fetchFuelTypes",
    async(_,thunkAPI) => {
        try{
            const allFuelTypes = await fuelTypeService.getAll();
            return allFuelTypes.data.response;
        }
        catch(error){
            console.error("Error fetching Fuel Types:", error);
            throw error;
        }
    }
);

export const getByIdFuelType = createAsyncThunk(
    "fuelTypes/getByIdFuelTypes",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await fuelTypeService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const addFuelType = createAsyncThunk(
    "fuelTypes/addFuelTypes",
    async(newFuelTypeData: AddFuelTypeModel, thunkAPI) => {
        try{
            const addedFuelType = await fuelTypeService.add(newFuelTypeData);
            console.log(addedFuelType);
            return addedFuelType.data;
        }
        catch (error: any){
            if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 3000) {
                const details = error.response.data.response.details[0];
                throw details;
              } 
        }
    }
);

export const updateFuelType = createAsyncThunk(
    "fuelTypes/updateFuelTypes",
    async(updatedFuelTypeData : UpdateFuelTypeModel, thunkAPI) => {
        try{
            const updatedFuelType = await fuelTypeService.update(updatedFuelTypeData);
            if (updatedFuelType.data) {
                return updatedFuelType.data.response;
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
)

export const deleteFuelType = createAsyncThunk(
    "fuelTypes/deleteFuelTypes",
    async({ fuelTypeId } : { fuelTypeId: number;}, thunkAPI) => {
        try{
            await fuelTypeService.delete(fuelTypeId);
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
    initialState: {fuelTypes : [] as any [], error: null as string | null },
    reducers:{},
    extraReducers: (builder) => {

        /*------------------*/

        builder.addCase(addFuelType.pending, (state) => {});
        builder.addCase(addFuelType.fulfilled, (state, action) => {
            state.error = null;
            state.fuelTypes.push(action.payload);
        });
        builder.addCase(addFuelType.rejected, (state, action) => {
            state.error = action.error.message || "Bir hata oluştu.";
        });

        /*------------------*/

        builder.addCase(fetchFuelType.pending, (state) => {});
        builder.addCase(fetchFuelType.fulfilled, (state, action) => {
            state.fuelTypes = action.payload;
        })
        builder.addCase(fetchFuelType.rejected, (state) => {})

        /*-------------------*/
        builder.addCase(getByIdFuelType.pending, (state) => { });
        builder.addCase(getByIdFuelType.fulfilled, (state, action) => {
            state.fuelTypes = action.payload;
        });
        builder.addCase(getByIdFuelType.rejected, (state) => {
        });



         /*------------------*/

        builder.addCase(updateFuelType.pending, (state) => {});
        builder.addCase(updateFuelType.fulfilled, (state, action) => {
            state.error = null;
            state.fuelTypes = [];
        })
        builder.addCase(updateFuelType.rejected, (state, action) => {
            state.error = action.error.message || "Bir hata oluştu.";
        });

        /*----------------------*/

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