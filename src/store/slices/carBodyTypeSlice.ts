import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarBodyTypeModel } from "../../models/Requests/CarBodyType/AddCarBodyTypeModel";
import CarBodyTypeService from "../../services/carBodyTypeService";
import { UpdateCarBodyTypeModel } from "../../models/Requests/CarBodyType/UpdateCarBodyTypeModel";


export const fetchCarBodyTypes = createAsyncThunk(
  "carBodyTypes/fetchCarBodyTypes",
  async (_, thunkAPI) => {
    try {
      const service: CarBodyTypeService = new CarBodyTypeService();
      const allCarBodyTypes = await service.getAll();
      return allCarBodyTypes.data.response;

    } catch (error) {
      console.error("Error fetching Car Body Types:", error);
      throw error;
    }
  }
);

export const addCarBodyType = createAsyncThunk(
  "carBodyTypes/addCarBodyTypes",
  async (newCarBodyTypeData: AddCarBodyTypeModel, thunkAPI) => {
    try {
      const service: CarBodyTypeService = new CarBodyTypeService();
      const addedCarBodyType = await service.add(newCarBodyTypeData);
      // Burada eklenen car bodey typeı geri dönebilirsiniz
      console.log(addedCarBodyType);

      return addedCarBodyType.data;
    } catch (error) {
      console.error("Error adding car body type:", error);
      throw error;
    }
  }
);

export const updateCarBodyType = createAsyncThunk(
  "carBodyTypes/updateCarBodyType",
  async (updatedCarBodyTypeData: UpdateCarBodyTypeModel, thunkAPI) => {
    try {

      const service: CarBodyTypeService = new CarBodyTypeService();
      const updatedCarBodyType = await service.update(updatedCarBodyTypeData);
      if (updatedCarBodyType.data) {
        return updatedCarBodyType.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } catch (error) {
      console.error("Error updating car body type:", error);
      throw error;
    }
  }
);

export const deleteCarBodyType = createAsyncThunk(
  "carBodyTypes/deleteCarBodyType",
  async ({ carBodyTypeId }: { carBodyTypeId: number; }, thunkAPI) => {
    try {
      const service: CarBodyTypeService = new CarBodyTypeService();
      await service.delete(carBodyTypeId);
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
  initialState: { carBodyTypes: [] as any[], error: null },
  reducers: {},
  extraReducers: (builder) => {

    /*-----------------------------------------------------------------*/

    builder.addCase(fetchCarBodyTypes.pending, (state) => { });
    builder.addCase(fetchCarBodyTypes.fulfilled, (state, action) => {
      state.carBodyTypes = action.payload;
    });
    builder.addCase(fetchCarBodyTypes.rejected, (state) => { });

    /*-----------------------------------------------------------------*/

    builder.addCase(addCarBodyType.pending, (state) => { });
    builder.addCase(addCarBodyType.fulfilled, (state, action) => {
      state.carBodyTypes.push(action.payload);
    });
    builder.addCase(addCarBodyType.rejected, (state) => { });

    /*-----------------------------------------------------------------*/

    builder.addCase(updateCarBodyType.pending, (state) => { });
    builder.addCase(updateCarBodyType.fulfilled, (state, action) => {
      state.carBodyTypes = [];
    });
    builder.addCase(updateCarBodyType.rejected, (state) => { });

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