import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCarSegmentModel } from "../../models/Requests/CarSegment/AddCarSegmentModel";
import CarSegmentService from "../../services/carSegmentService";
import { UpdateCarSegmentModel } from "../../models/Requests/CarSegment/UpdateCarSegmentModel";
import carSegmentService from "../../services/carSegmentService";


export const fetchCarSegments = createAsyncThunk(
  "carSegments/fetchCarSegments",
  async (_, thunkAPI) => {
    try {
      const allCarSegmnets = await carSegmentService.getAll();
      return allCarSegmnets.data.response;

    } catch (error) {
      console.error("Error fetching car segments:", error);
      throw error;
    }
  }
);

export const getByIdCarSegment = createAsyncThunk(
  "carSegments/getByIdCarSegments",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await carSegmentService.getById(id);
      return getByIded.data.response;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw error;
    }
  }
);


export const addCarSegment = createAsyncThunk(
  "carSegments/addCarSegment",
  async (newCarSegmentData: AddCarSegmentModel, thunkAPI) => {
    try {
      const addedCarSegment = await carSegmentService.add(newCarSegmentData);

      return addedCarSegment.data;

    } catch (error : any) {
      if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 3000) {
        const details = error.response.data.response.details[0];
        throw details;
      } 
    }
  }
);

export const updateCarSegment = createAsyncThunk(
  "carSegments/updateCarSegment",
  async (updatedCarSegmentData: UpdateCarSegmentModel, thunkAPI) => {
    try {
      const updatedCarSegment = await carSegmentService.update(updatedCarSegmentData);
      if (updatedCarSegment.data) {
        return updatedCarSegment.data.response;
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
);


export const deleteCarSegment = createAsyncThunk(
  "carSegments/deleteCarSegment",
  async ({ carSegmentId }: { carSegmentId: number; }, thunkAPI) => {
    try {
      await carSegmentService.delete(carSegmentId);
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
  initialState: { carSegments: [] as any[], error: null as string | null},
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchCarSegments.pending, (state) => { });
    builder.addCase(fetchCarSegments.fulfilled, (state, action) => {
      state.carSegments = action.payload;
    });
    builder.addCase(fetchCarSegments.rejected, (state) => { });

    /*----------------*/
    builder.addCase(getByIdCarSegment.pending, (state) => { });
    builder.addCase(getByIdCarSegment.fulfilled, (state, action) => {
      state.carSegments = action.payload;
    });
    builder.addCase(getByIdCarSegment.rejected, (state) => {
    });



    /*----------------*/

    builder.addCase(addCarSegment.pending, (state) => { });
    builder.addCase(addCarSegment.fulfilled, (state, action) => {
      state.error = null;
      state.carSegments.push(action.payload);
    });
    builder.addCase(addCarSegment.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
     });

    /*----------------*/

    builder.addCase(updateCarSegment.pending, (state) => { });
    builder.addCase(updateCarSegment.fulfilled, (state, action) => {
      state.error = null;
      state.carSegments = [];
    });
    builder.addCase(updateCarSegment.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

    /*----------------*/

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