import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RentalService from "../../services/rentalService";

export const fetchRentals = createAsyncThunk(
    "rentals/fetchRentals",
    async (_, thunkAPI) => {
        try {
            const service: RentalService = new RentalService();
            const allRentals = await service.getAll();
            return allRentals.data.response;

        } catch (error) {
            console.error("Error fetching rental:", error);
            throw error;
        }
    }
);


const rentalSlice = createSlice({
    name: "rental",
    initialState: { rentals: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchRentals.pending, (state) => { });
        builder.addCase(fetchRentals.fulfilled, (state, action) => {
            state.rentals = action.payload;
        });
        builder.addCase(fetchRentals.rejected, (state) => { });

    }
});

export const rentalReducer = rentalSlice.reducer;
export const { } = rentalSlice.actions;