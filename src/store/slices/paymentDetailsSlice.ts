import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentDetailsService from "../../services/paymentDetailsService";
import { UpdatePaymentDetailsModel } from "../../models/Requests/UpdatePaymentDetailsModel";

export const fetchPaymentDetails = createAsyncThunk(
    "paymentDetails/fetchPaymentDetails",
    async (_, thunkAPI) => {
        try {
            const service: PaymentDetailsService = new PaymentDetailsService();
            const allPaymentDetails = await service.getAll();
            return allPaymentDetails.data.response;

        } catch (error) {
            console.error("Error fetching payment details:", error);
            throw error;
        }
    }
);

export const updatePaymentDetails = createAsyncThunk(
    "paymentDetails/updatePaymentDetails",
    async (updatedPaymentDetailsData: UpdatePaymentDetailsModel, thunkAPI) => {
        try {

            const service: PaymentDetailsService = new PaymentDetailsService();
            const updatedPaymentDetails = await service.update(updatedPaymentDetailsData);
            if (updatedPaymentDetails.data) {
                return updatedPaymentDetails.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error) {
            console.error("Error updating paymnet details:", error);
            throw error;
        }
    }
);



const paymentDetailsSlice = createSlice({
    name: "paymentDetails",
    initialState: { paymentDetails: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPaymentDetails.pending, (state) => { });
        builder.addCase(fetchPaymentDetails.fulfilled, (state, action) => {
            state.paymentDetails = action.payload;
        });
        builder.addCase(fetchPaymentDetails.rejected, (state) => { });
        

        builder.addCase(updatePaymentDetails.pending, (state) => { });
        builder.addCase(updatePaymentDetails.fulfilled, (state, action) => {
            state.paymentDetails = [];
        });
        builder.addCase(updatePaymentDetails.rejected, (state) => {});

    }
});

export const paymentDetailsReducer = paymentDetailsSlice.reducer;
export const { } = paymentDetailsSlice.actions;