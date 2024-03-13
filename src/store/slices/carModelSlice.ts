import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarModelModel } from "../../models/Requests/CarModel/AddCarModelModel";
import { UpdateCarModelModel } from "../../models/Requests/CarModel/UpdateCarModelModel";
import carModelService from "../../services/carModelService";

export const addCarModel = createAsyncThunk(
    "carModel/addCarModel",
    async (addCarModelData: AddCarModelModel     
      , thunkAPI) => {
      try {
        const addedCarModel = await carModelService.add(addCarModelData);
        return addedCarModel.data;

      } 
      catch (error: any) {
        if (error && error.response && error.response.data.response.errorCode === 2008) {
          
            throw error.response.data.response.details[0];
          
        }
        
      }
    }
  );
export const updateCarModel = createAsyncThunk(
    "carModel/updateCarModel",
    async (updateCarModelData: UpdateCarModelModel     
      , thunkAPI) => {
      try {
        const updatedCarModel = await carModelService.update(updateCarModelData);
        return updatedCarModel.data;

      }
      catch (error: any) {
        if (error && error.response && error.response.data.response.errorCode === 2008) {
          
            throw error.response.data.response.details[0];
          
        }
        
      }
    }
  );
  
export const fetchCarModels = createAsyncThunk(
    "carModel/fetchCarModel",
    async (_, thunkAPI) => {
      try {
        const fetchedCarModel = await carModelService.getAll();
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
        const getByBrandIded = await carModelService.getByBrandId(brandId);
        return getByBrandIded.data.response;

      } catch (error) {
        console.error("Error adding getByBrandIded:", error);
        throw error;
      }
    }
  );

  export const getByIdCarModels = createAsyncThunk(
    "carModels/getByIdCarModels",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await carModelService.getById(id);
            return getByIded.data;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

  export const deleteCarModel = createAsyncThunk(
      "carModels/deleteCarModel",
      async ({ id }: { id: number; }, thunkAPI) => {
      try {
        await carModelService.delete(id);
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
    initialState: { carModel: [] as any[],error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
     
  
      builder.addCase(addCarModel.pending, (state) => {});
      builder.addCase(addCarModel.fulfilled, (state, action) => {
        state.error=null;
        state.carModel.push(action.payload);
      });
      builder.addCase(addCarModel.rejected, (state,action) => {
        state.error = action.error.message || "Bir hata oluştu.";
      });

      builder.addCase(getByIdCarModels.pending, (state) => { });
      builder.addCase(getByIdCarModels.fulfilled, (state, action) => {
          state.carModel = [action.payload];
      });
      builder.addCase(getByIdCarModels.rejected, (state) => {
      });

      builder.addCase(updateCarModel.pending, (state) => {});
      builder.addCase(updateCarModel.fulfilled, (state, action) => {
        state.error=null;
        state.carModel = [];
      });
      builder.addCase(updateCarModel.rejected, (state,action) => {
        state.error = action.error.message || "Bir hata oluştu.";
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