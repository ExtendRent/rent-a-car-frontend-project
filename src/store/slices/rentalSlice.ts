import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "../../services/rentalService";
import { UpdateRentalModel } from "../../models/Requests/Rental/UpdateRentalModel";
import { AddRentalModel } from "../../models/Requests/Rental/AddRentalModel";
import { ReturnRentalModel } from "../../models/Requests/Rental/ReturnRentalModel";

export const fetchRentals = createAsyncThunk(
    "rentals/fetchRentals",
    async (_, thunkAPI) => {
        try {
            const allRentals = await rentalService.getAll();
            return allRentals.data.response;

        } catch (error) {
            console.error("Error fetching rental:", error);
            throw error;
        }
    }
);

export const getByIdRental = createAsyncThunk(
    "rentals/getByIdRentals",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await rentalService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const addRental = createAsyncThunk(
    "rental/addRental",
    async (addRentalData: AddRentalModel, thunkAPI) => {
        try {
            const addedRental = await rentalService.add(addRentalData);
            return addedRental.data;

        } catch (error) {
            console.error("Error adding addedRental:", error);
            throw error;
        }
    }
);

export const updateRental = createAsyncThunk(
    "rentals/updateRentals",
    async (updatedRentalData: UpdateRentalModel, thunkAPI) => {
        try {
            return (await rentalService.update(updatedRentalData)).data.response;
        } catch (error) {
            console.error("Error updating rental: ", error);
            throw error;
        }
    }
);

export const returnRental = createAsyncThunk(
    "rentals/returnRentals",
    async (returnRentalData: ReturnRentalModel, thunkAPI) => {
        try {
            return (await rentalService.returnRental(returnRentalData)).data.response;
        } catch (error) {
            console.error("Error updating return rental: ", error);
            throw error;
        }
    }
);

export const getCountByStatus = createAsyncThunk(
    "rentals/getCountByStatus",
    async ({ status }: { status: number; }, thunkAPI) => {
        try {
            const getByCounted = await rentalService.getCountByStatus(status);
            return getByCounted.data.response;

        } catch (error) {
            console.error("Error adding getByCounted:", error);
            throw error;
        }
    }
);

export const getCountIsDeleted = createAsyncThunk(
    "rentals/getCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
        try {
            const getCountIsDelete = await rentalService.getCountIsDeleted(deleted);
            return getCountIsDelete.data.response;

        } catch (error) {
            console.error("Error adding getCountIsDeleted:", error);
            throw error;
        }
    }
);


export const startRental = createAsyncThunk(
    "rentals/startRentals",
    async ({ rentalId }: { rentalId: number; }, thunkAPI) => {
        try {
            return (await rentalService.startRental(rentalId)).data.response;

        } catch (error) {
            console.error("Error deleting start rental:", error);
            throw error;
        }
    }
);




export const deleteRental = createAsyncThunk(
    "rentals/deleteRental",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            await rentalService.delete(id);
            return {
                deletedRentalId: id
            };
        } catch (error) {
            console.error("Error deleting rental:", error);
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

        /*-----------------*/

        builder.addCase(getByIdRental.pending, (state) => { });
        builder.addCase(getByIdRental.fulfilled, (state, action) => {
            state.rentals = action.payload;
        });
        builder.addCase(getByIdRental.rejected, (state) => {
        });

        /*-----------------*/
        builder.addCase(addRental.pending, (state) => { });
        builder.addCase(addRental.fulfilled, (state, action) => {
            state.rentals.push(action.payload);
        });
        builder.addCase(addRental.rejected, (state) => { });

        /*-----------------*/

        builder.addCase(returnRental.pending, (state) => { });
        builder.addCase(returnRental.fulfilled, (state, action) => {
            state.rentals = action.payload;
        });
        builder.addCase(returnRental.rejected, (state) => {
        });

        /*-----------------*/

        builder.addCase(updateRental.pending, (state) => { });
        builder.addCase(updateRental.fulfilled, (state, action) => {
            state.rentals = [];
        });
        builder.addCase(updateRental.rejected, (state) => { });

        /*-----------------*/

        builder.addCase(deleteRental.pending, (state) => { });
        builder.addCase(deleteRental.fulfilled, (state, action) => {
            const deletedRentalId = action.payload.deletedRentalId;
            state.rentals = state.rentals.filter(rental => rental.id !== deletedRentalId);
        });
        builder.addCase(deleteRental.rejected, (state) => { });


        /*-----------------*/

        builder.addCase(getCountByStatus.pending, (state) => { });
        builder.addCase(getCountByStatus.fulfilled, (state, action) => {
            state.rentals = action.payload;
        });
        builder.addCase(getCountByStatus.rejected, (state) => {
        });

        /*-----------------*/

        builder.addCase(getCountIsDeleted.pending, (state) => { });
        builder.addCase(getCountIsDeleted.fulfilled, (state, action) => {
            state.rentals = action.payload;
        });
        builder.addCase(getCountIsDeleted.rejected, (state) => {
        });

        /*-----------------*/

        builder.addCase(startRental.pending, (state) => { });
        builder.addCase(startRental.fulfilled, (state, action) => {
            state.rentals = [];
        });
        builder.addCase(startRental.rejected, (state) => { });
    }
});

export const rentalReducer = rentalSlice.reducer;
export const { } = rentalSlice.actions;