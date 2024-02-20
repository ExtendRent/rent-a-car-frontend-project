import { UpdateFuelTypeModel } from '../../models/Requests/FuelType/UpdateFuelTypeModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddFuelTypeModel } from '../../models/Requests/FuelType/AddFuelTypeModel';
import FuelTypeService from '../../services/fuelTypeService';
import ImageService, { EmailImageRequest, LicanseImageRequest } from '../../services/imageService';

export const addCarImages = createAsyncThunk(
    "images/addCarImages",
    async(values: any, thunkAPI) => {
        try{
            const service: ImageService = new ImageService();
            const { licensePlate, image } = values;
            const addedImage = await service.addCarImage(licensePlate,image);
   
            return addedImage.data;
        }
        catch (error){
            console.error("Error adding fuel types", error);
            throw error;
        }
    }
);

export const addUserImages = createAsyncThunk(
    "images/addUserImages",
    async(addUserImage: EmailImageRequest, thunkAPI) => {
        try{
            const service: ImageService = new ImageService();
            const addedImage = await service.addUserImage(addUserImage);
   
            return addedImage.data;
        }
        catch (error){
            console.error("Error adding fuel types", error);
            throw error;
        }
    }
);

export const addBrandImages = createAsyncThunk(
    "images/addBrandImages",
    async(addBrandImage: LicanseImageRequest, thunkAPI) => {
        try{
            const service: ImageService = new ImageService();
            const addedImage = await service.addBrandImage(addBrandImage);
   
            return addedImage.data;
        }
        catch (error){
            console.error("Error adding fuel types", error);
            throw error;
        }
    }
);

const imageSlice = createSlice({
    name: "image",
    initialState: {images : [] as any [], error: null},
    reducers:{},
    extraReducers: (builder) => {


        builder.addCase(addCarImages.pending, (state) => {});
        builder.addCase(addCarImages.fulfilled, (state, action) => {
            state.images.push(action.payload);
        });
        builder.addCase(addCarImages.rejected, (state) => {});


        builder.addCase(addUserImages.pending, (state) => {});
        builder.addCase(addUserImages.fulfilled, (state, action) => {
            state.images.push(action.payload);
        });
        builder.addCase(addUserImages.rejected, (state) => {});


        builder.addCase(addBrandImages.pending, (state) => {});
        builder.addCase(addBrandImages.fulfilled, (state, action) => {
            state.images.push(action.payload);
        });
        builder.addCase(addBrandImages.rejected, (state) => {});

    }
})

export const imageReducer = imageSlice.reducer;
export const {} = imageSlice.actions;