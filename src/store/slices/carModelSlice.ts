import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarModelModel } from "../../models/Requests/AddCarModelModel";
import CarModelService from "../../services/carModelService";
import { UpdateCarModelModel } from "../../models/Requests/UpdateCarModelModel";

export const addCarModel = createAsyncThunk(
    "carModel/addCarModel",
    async (addCarModelData: AddCarModelModel     
      , thunkAPI) => {
      try {
        const service: CarModelService = new CarModelService();
        const addedCarModel = await service.add(addCarModelData);
        return addedCarModel.data;

      } catch (error) {
        console.error("Error adding addedCarModel:", error);
        throw error;
      }
    }
  );
export const updateCarModel = createAsyncThunk(
    "carModel/updateCarModel",
    async (updateCarModelData: UpdateCarModelModel     
      , thunkAPI) => {
      try {
        const service: CarModelService = new CarModelService();
        const updatedCarModel = await service.update(updateCarModelData);
        return updatedCarModel.data;

      } catch (error) {
        console.error("Error updated updatedCarModel:", error);
        throw error;
      }
    }
  );
  
export const fetchCarModels = createAsyncThunk(
    "carModel/fetchCarModel",
    async (_, thunkAPI) => {
      try {
        const service: CarModelService = new CarModelService();
        const fetchedCarModel = await service.getAll();
        return fetchedCarModel.data.response;

      } catch (error) {
        console.error("Error adding fetchedCarModel:", error);
        throw error;
      }
    }
  );
  export const getByBrandIdCarModels = createAsyncThunk(
    "carModel/getByBrandIdCarModels",
    async ({ brandId }: { brandId: number; }, thunkAPI) => {
      try {
        const service: CarModelService = new CarModelService();
        const getByBrandIded = await service.getByBrandId(brandId);
        return getByBrandIded.data.response;

      } catch (error) {
        console.error("Error adding getByBrandIded:", error);
        throw error;
      }
    }
  );

  export const deleteCarModel = createAsyncThunk(
      "carModels/deleteCarModel",
      async ({ id }: { id: number; }, thunkAPI) => {
      try {
        const service: CarModelService = new CarModelService();
        await service.delete(id);
        return { 
            deletedCarModelId: id 
          };
      } catch (error) {
        console.error("Error deleting car model:", error);
        throw error;
      }
    }
  );

  const carModelSlice = createSlice({
    name: "carModel",
    initialState: { carModel: [] as any[],error:null },
    reducers: {},
    extraReducers: (builder) => {
     
  
      builder.addCase(addCarModel.pending, (state) => {});
      builder.addCase(addCarModel.fulfilled, (state, action) => {
        state.carModel.push(action.payload);
      });
      builder.addCase(addCarModel.rejected, (state) => {
        
      });

      builder.addCase(updateCarModel.pending, (state) => {});
      builder.addCase(updateCarModel.fulfilled, (state, action) => {
        state.carModel = [];
      });
      builder.addCase(updateCarModel.rejected, (state) => {
        
      });

      builder.addCase(fetchCarModels.pending, (state) => {});
      builder.addCase(fetchCarModels.fulfilled, (state, action) => {
        state.carModel = action.payload;
      });
      builder.addCase(fetchCarModels.rejected, (state) => {
      });


      builder.addCase(getByBrandIdCarModels.pending, (state) => {});
      builder.addCase(getByBrandIdCarModels.fulfilled, (state, action) => {
        state.carModel = action.payload;
      });
      builder.addCase(getByBrandIdCarModels.rejected, (state) => {
      });

      builder.addCase(deleteCarModel.pending, (state) => {});
      builder.addCase(deleteCarModel.fulfilled, (state, action) => {
        // Silinen araba modelini state'den kaldır
        const deletedCarModelId = action.payload.deletedCarModelId;
        state.carModel = state.carModel.filter(carModel => carModel.id !== deletedCarModelId);
      });
      builder.addCase(deleteCarModel.rejected, (state) => {
      });

    },
  });
  
  export const carModelReducer = carModelSlice.reducer;
  export const {} = carModelSlice.actions;