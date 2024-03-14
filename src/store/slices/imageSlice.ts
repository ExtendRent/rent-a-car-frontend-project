import { UpdateFuelTypeModel } from "../../models/Requests/FuelType/UpdateFuelTypeModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddFuelTypeModel } from "../../models/Requests/FuelType/AddFuelTypeModel";
import FuelTypeService from "../../services/fuelTypeService";
import ImageService from "../../services/imageService";

export const addCarImages = createAsyncThunk(
  "images/addCarImages",
  async (
    { image, licensePlate }: { image: FormData; licensePlate: string },
    thunkAPI
  ) => {
    try {
      const service: ImageService = new ImageService();

      const addedImage = await service.addCarImage(image, licensePlate);

      return addedImage.data;
    } catch (error: any) {
      if (
        error &&
        error.response &&
        (error.response.data.response.errorCode === 1 ||
          error.response.data.response.details[0])
      ) {
        throw "Resim boyutu maximum boyutu aşmıştır.Daha küçük boyutlu bir resim yükleyiniz.";
      }
    }
  }
);

export const addUserImages = createAsyncThunk(
  "images/addUserImages",
  async (
    { image, emailAddress }: { image: FormData; emailAddress: string },
    thunkAPI
  ) => {
    try {
      const service: ImageService = new ImageService();
      const addedImage = await service.addUserImage(image, emailAddress);

      return addedImage.data;
    } catch (error: any) {
      if (
        error &&
        error.response &&
        (error.response.data.response.errorCode === 1 ||
          error.response.data.response.details[0])
      ) {
        throw "Resim boyutu maximum boyutu aşmıştır.Daha küçük boyutlu bir resim yükleyiniz.";
      }
    }
  }
);

export const addBrandImages = createAsyncThunk(
  "images/addBrandImages",
  async (
    { image, brandName  }: { image: FormData; brandName : string },
    thunkAPI
  ) => {
    try {
      const service: ImageService = new ImageService();
      const addedImage = await service.addBrandImage(image, brandName );

      return addedImage.data;
    } catch (error: any) {
      if (
        error &&
        error.response &&
        (error.response.data.response.errorCode === 1 ||
          error.response.data.response.details[0])
      ) {
        throw "Resim boyutu maximum boyutu aşmıştır.Daha küçük boyutlu bir resim yükleyiniz.";
      }
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState: { images: [] as any[], error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCarImages.pending, (state) => {});
    builder.addCase(addCarImages.fulfilled, (state, action) => {
      state.error = null;
      state.images.push(action.payload);
    });
    builder.addCase(addCarImages.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

    builder.addCase(addUserImages.pending, (state) => {});
    builder.addCase(addUserImages.fulfilled, (state, action) => {
      state.error = null;
      state.images.push(action.payload);
    });
    builder.addCase(addUserImages.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

    builder.addCase(addBrandImages.pending, (state) => {});
    builder.addCase(addBrandImages.fulfilled, (state, action) => {
      state.error = null;
      state.images.push(action.payload);
    });
    builder.addCase(addBrandImages.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });
  },
});

export const imageReducer = imageSlice.reducer;
export const {} = imageSlice.actions;
