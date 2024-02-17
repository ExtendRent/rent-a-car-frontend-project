import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarSegmentModel } from "../../models/Requests/CarSegment/AddCarSegmentModel";
import CarSegmentService from "../../services/carSegmentService";
import { UpdateCarSegmentModel } from "../../models/Requests/CarSegment/UpdateCarSegmentModel";


export const fetchCarSegments = createAsyncThunk(
  "carSegments/fetchCarSegments",
  async (_, thunkAPI) => {
    try {
      const service: CarSegmentService = new CarSegmentService();
      const allCarSegmnets = await service.getAll();
      return allCarSegmnets.data.response;

    } catch (error) {
      console.error("Error fetching car segments:", error);
      throw error;
    }
  }
);

export const addCarSegment = createAsyncThunk(
    "carSegments/addCarSegment",
    async (newCarSegmentData: AddCarSegmentModel, thunkAPI) => {
      try {
        const service: CarSegmentService = new CarSegmentService();
        const addedCarSegment = await service.add(newCarSegmentData);
  
        return addedCarSegment.data;
  
      } catch (error) {
        console.error("Error adding car segment:", error);
        throw error;
      }
    }
  );

  export const updateCarSegment = createAsyncThunk(
    "carSegments/updateCarSegment",
    async (updatedCarSegmentData: UpdateCarSegmentModel, thunkAPI) => {
      try {
  
        const service: CarSegmentService = new CarSegmentService();
        const updatedCarSegment = await service.update(updatedCarSegmentData);
        if (updatedCarSegment.data) {
          return updatedCarSegment.data.response;
        }
        else {
          console.warn("Server response does not contain data.");
          return null;
        }
      } catch (error) {
        console.error("Error updating car segment:", error);
        throw error;
      }
    }
  );
  
  
  export const deleteCarSegment = createAsyncThunk(
    "carSegments/deleteCarSegment",
    async ({ carSegmentId }: { carSegmentId: number; }, thunkAPI) => {
      try {
        const service: CarSegmentService = new CarSegmentService();
        await service.delete(carSegmentId);
        return {
          deletedCarSegmentId: carSegmentId
        };
      } catch (error) {
        console.error("Error deleting car segment:", error);
        throw error;
      }
    }
  );


  const carSegmentSlice = createSlice({
    name: "carSegment",
    initialState: { carSegments: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

      builder.addCase(fetchCarSegments.pending, (state) => { });
      builder.addCase(fetchCarSegments.fulfilled, (state, action) => {
        state.carSegments = action.payload;
      });
      builder.addCase(fetchCarSegments.rejected, (state) => { });
  
        builder.addCase(addCarSegment.pending, (state) => { });
        builder.addCase(addCarSegment.fulfilled, (state, action) => {
          state.carSegments.push(action.payload);
        });
        builder.addCase(addCarSegment.rejected, (state) => { });

        builder.addCase(updateCarSegment.pending, (state) => {});
        builder.addCase(updateCarSegment.fulfilled, (state, action) => {
          state.carSegments = [];
        });
        builder.addCase(updateCarSegment.rejected, (state) => {
          
        });
    
    
        builder.addCase(deleteCarSegment.pending, (state) => { });
        builder.addCase(deleteCarSegment.fulfilled, (state, action) => {
          const deletedCarSegmentId = action.payload.deletedCarSegmentId;
          state.carSegments = state.carSegments.filter(carSegment => carSegment.id !== deletedCarSegmentId);
        });
        builder.addCase(deleteCarSegment.rejected, (state) => { });

    },

});

export const carSegmentReducer = carSegmentSlice.reducer;
export const { } = carSegmentSlice.actions;