import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RentalStatusService from "../../services/rentalStatusService";

export const fetchRentalStatuses = createAsyncThunk(
    "rentalStatuses/fetchRentalStatuses",
    async (_, thunkAPI) => {
        try {
            const service: RentalStatusService = new RentalStatusService();
            const allRentalStatuses = await service.getAll();
            return allRentalStatuses.data.response;

        } catch (error) {
            console.error("Error fetching rental status:", error);
            throw error;
        }
    }
);

const rentalStatusSlice = createSlice({
    name: "rentalStatus",
    initialState: { rentalStatuses: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchRentalStatuses.pending, (state) => { });
        builder.addCase(fetchRentalStatuses.fulfilled, (state, action) => {
            state.rentalStatuses = action.payload;
        });
        builder.addCase(fetchRentalStatuses.rejected, (state) => { });
      
    }
});

export const rentalStatusReducer = rentalStatusSlice.reducer;
export const { } = rentalStatusSlice.actions;  