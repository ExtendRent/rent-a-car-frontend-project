import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarBodyTypeModel } from "../../models/Requests/CarBodyType/AddCarBodyTypeModel";
import CarBodyTypeService from "../../services/carBodyTypeService";
import { UpdateCarBodyTypeModel } from "../../models/Requests/CarBodyType/UpdateCarBodyTypeModel";
import carBodyTypeService from "../../services/carBodyTypeService";


export const fetchCarBodyTypes = createAsyncThunk(
  "carBodyTypes/fetchCarBodyTypes",
  async (_, thunkAPI) => {
    try {
      const allCarBodyTypes = await carBodyTypeService.getAll();
      return allCarBodyTypes.data.response;

    } catch (error) {
      console.error("Error fetching Car Body Types:", error);
      throw error;
    }
  }
);

export const getByIdCarBodyType = createAsyncThunk(
  "carBodyTypes/getByIdCarBodyTypes",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await carBodyTypeService.getById(id);
      return getByIded.data.response;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw error;
    }
  }
);


export const addCarBodyType = createAsyncThunk(
  "carBodyTypes/addCarBodyTypes",
  async (newCarBodyTypeData: AddCarBodyTypeModel, thunkAPI) => {
    try {
      const addedCarBodyType = await carBodyTypeService.add(newCarBodyTypeData);
      // Burada eklenen car bodey typeı geri dönebilirsiniz
      console.log(addedCarBodyType);

      return addedCarBodyType.data;
    }
    catch (error: any) {
      if (error && error.response && error.response.data.response.errorCode === 2007) {
        
          throw error.response.data.response.details[0];
        
      }
      
    }
  }
);

export const updateCarBodyType = createAsyncThunk(
  "carBodyTypes/updateCarBodyType",
  async (updatedCarBodyTypeData: UpdateCarBodyTypeModel, thunkAPI) => {
    try {

      const updatedCarBodyType = await carBodyTypeService.update(updatedCarBodyTypeData);
      if (updatedCarBodyType.data) {
        return updatedCarBodyType.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } 
    catch (error: any) {
      if (error && error.response && error.response.data.response.errorCode === 2007) {
        
          throw error.response.data.response.details[0];
        
      }
      
    }
  }
);

export const deleteCarBodyType = createAsyncThunk(
  "carBodyTypes/deleteCarBodyType",
  async ({ carBodyTypeId }: { carBodyTypeId: number; }, thunkAPI) => {
    try {
      await carBodyTypeService.delete(carBodyTypeId);
      return {
        deletedCarBodyTypeId: carBodyTypeId
      };
    } catch (error) {
      console.error("Error deleting car body type:", error);
      throw error;
    }
  }
);

const carBodyTypeSlice = createSlice({
  name: "carBodyType",
  initialState: { carBodyTypes: [] as any[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {

    /*-----------------------------------------------------------------*/

    builder.addCase(fetchCarBodyTypes.pending, (state) => { });
    builder.addCase(fetchCarBodyTypes.fulfilled, (state, action) => {
      state.carBodyTypes = action.payload;
    });
    builder.addCase(fetchCarBodyTypes.rejected, (state) => { });

    /*-----------------------------------------------------------------*/

    builder.addCase(getByIdCarBodyType.pending, (state) => { });
    builder.addCase(getByIdCarBodyType.fulfilled, (state, action) => {
        state.carBodyTypes = [action.payload];
    });
    builder.addCase(getByIdCarBodyType.rejected, (state) => {
    });

    /*-----------------------------------------------------------------*/

    builder.addCase(addCarBodyType.pending, (state) => { });
    builder.addCase(addCarBodyType.fulfilled, (state, action) => {
      state.error=null;
      state.carBodyTypes.push(action.payload);
    });
    builder.addCase(addCarBodyType.rejected, (state,action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*-----------------------------------------------------------------*/

    builder.addCase(updateCarBodyType.pending, (state) => { });
    builder.addCase(updateCarBodyType.fulfilled, (state, action) => {
      state.error=null;
      state.carBodyTypes = [];
    });
    builder.addCase(updateCarBodyType.rejected, (state,action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

    /*-----------------------------------------------------------------*/

    builder.addCase(deleteCarBodyType.pending, (state) => { });
    builder.addCase(deleteCarBodyType.fulfilled, (state, action) => {
      const deletedCarBodyTypeId = action.payload.deletedCarBodyTypeId;
      state.carBodyTypes = state.carBodyTypes
        .filter(carBodyType => carBodyType.id !== deletedCarBodyTypeId);
    });
    builder.addCase(deleteCarBodyType.rejected, (state) => { });

  }
})

export const carBodyTypeReducer = carBodyTypeSlice.reducer;
export const { } = carBodyTypeSlice.actions;