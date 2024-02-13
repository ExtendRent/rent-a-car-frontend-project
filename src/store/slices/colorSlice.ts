import { UpdateColorModel } from '../../models/Requests/Color/UpdateColorModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddColorModel } from "../../models/Requests/Color/AddColorModel";
import ColorService from "../../services/colorService";


export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (_, thunkAPI) => {
    try {
      const service: ColorService = new ColorService();
      const allColors = await service.getAll();
      return allColors.data.response;

    } catch (error) {
      console.error("Error fetching colors:", error);
      throw error;
    }
  }
);

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColorData: AddColorModel, thunkAPI) => {
    try {
      const service: ColorService = new ColorService();
      const addedColor = await service.add(newColorData);

      return addedColor.data;

    } catch (error) {
      console.error("Error adding color:", error);
      throw error;
    }
  }
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (updatedColorData: UpdateColorModel, thunkAPI) => {
    try {

      const service: ColorService = new ColorService();
      const updatedColor = await service.update(updatedColorData);
      if (updatedColor.data) {
        return updatedColor.data.response;
      }
      else {
        console.warn("Server response does not contain data.");
        return null;
      }
    } catch (error) {
      console.error("Error updating color:", error);
      throw error;
    }
  }
);


export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async ({ colorId }: { colorId: number; }, thunkAPI) => {
    try {
      const service: ColorService = new ColorService();
      await service.delete(colorId);
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
  initialState: { colors: [] as any[], error: null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchColors.pending, (state) => { });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
    builder.addCase(fetchColors.rejected, (state) => { });


    builder.addCase(addColor.pending, (state) => { });
    builder.addCase(addColor.fulfilled, (state, action) => {
      state.colors.push(action.payload);
    });
    builder.addCase(addColor.rejected, (state) => { });

    builder.addCase(updateColor.pending, (state) => {});
    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.colors = [];
    });
    builder.addCase(updateColor.rejected, (state) => {
      
    });


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