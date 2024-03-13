import { UpdateColorModel } from '../../models/Requests/Color/UpdateColorModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddColorModel } from "../../models/Requests/Color/AddColorModel";
import ColorService from "../../services/colorService";
import colorService from '../../services/colorService';


export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (_, thunkAPI) => {
    try {
      const allColors = await colorService.getAll();
      return allColors.data.response;

    } catch (error) {
      console.error("Error fetching colors:", error);
      throw error;
    }
  }
);

export const getByIdColor = createAsyncThunk(
  "colors/getByIdColors",
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const getByIded = await colorService.getById(id);
      return getByIded.data.response;

    } catch (error) {
      console.error("Error adding getByIded:", error);
      throw error;
    }
  }
);

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColorData: AddColorModel, thunkAPI) => {
    try {
      const addedColor = await colorService.add(newColorData);

      return addedColor.data;

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 2006) {
        const details = error.response.data.response.details[0];
        throw details;
      } 
    }
  }
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (updatedColorData: UpdateColorModel, thunkAPI) => {
    try {

      const updatedColor = await colorService.update(updatedColorData);
      if (updatedColor.data) {
        return updatedColor.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } catch (error : any) {
      if (error && error.response && error.response.data.response.errorCode === 2006) {
        const details = error.response.data.response.details[0];
       throw details;
    }
    }
  }
);


export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async ({ colorId }: { colorId: number; }, thunkAPI) => {
    try {
      await colorService.delete(colorId);
      return {
        deletedColorId: colorId
      };
    } catch (error) {
      console.error("Error deleting color:", error);
      throw error;
    }
  }
);




const colorSlice = createSlice({
  name: "color",
  initialState: { colors: [] as any[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchColors.pending, (state) => { });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
    builder.addCase(fetchColors.rejected, (state) => { });
    /*-----------------*/

    builder.addCase(getByIdColor.pending, (state) => { });
    builder.addCase(getByIdColor.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
    builder.addCase(getByIdColor.rejected, (state) => {
    });

    /*-----------------*/


    builder.addCase(addColor.pending, (state) => { });
    builder.addCase(addColor.fulfilled, (state, action) => {
      state.error = null;
      state.colors.push(action.payload);
    });
    builder.addCase(addColor.rejected, (state, action) => { 
      state.error = action.error.message || "Bir hata oluştu.";
    });

    builder.addCase(updateColor.pending, (state) => { });
    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.error = null;
      state.colors = [];
    });
    builder.addCase(updateColor.rejected, (state, action) => {  state.error = action.error.message || "Bir hata oluştu."; });
    /*-----------------*/

    builder.addCase(deleteColor.pending, (state) => { });
    builder.addCase(deleteColor.fulfilled, (state, action) => {
      const deletedColorId = action.payload.deletedColorId;
      state.colors = state.colors.filter(color => color.id !== deletedColorId);
    });
    builder.addCase(deleteColor.rejected, (state) => { });
  },

});

export const colorReducer = colorSlice.reducer;
export const { } = colorSlice.actions;