import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentTypeService from "../../services/paymentTypeService";
import { UpdatePaymentTypeModel } from "../../models/Requests/PaymentType/UpdatePaymentTypeModel";

export const fetchPaymentTypes = createAsyncThunk(
    "paymentTypes/fetchPaymentTypes",
    async (_, thunkAPI) => {
        try {
            const service: PaymentTypeService = new PaymentTypeService();
            const allPaymentTypes = await service.getAll();
            return allPaymentTypes.data.response;

        } catch (error) {
            console.error("Error fetching payment type:", error);
            throw error;
        }
    }
);

export const updatePaymentType = createAsyncThunk(
    "paymentTypes/updatePaymentType",
    async (updatedPaymentTypeData: UpdatePaymentTypeModel, thunkAPI) => {
        try {

            const service: PaymentTypeService = new PaymentTypeService();
            const updatedPaymentType = await service.update(updatedPaymentTypeData);
            if (updatedPaymentType.data) {
                return updatedPaymentType.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error) {
            console.error("Error updating paymnet type:", error);
            throw error;
        }
    }
);



const paymentTypeSlice = createSlice({
    name: "paymentType",
    initialState: { paymentTypes: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPaymentTypes.pending, (state) => { });
        builder.addCase(fetchPaymentTypes.fulfilled, (state, action) => {
            state.paymentTypes = action.payload;
        });
        builder.addCase(fetchPaymentTypes.rejected, (state) => { });
        

        builder.addCase(updatePaymentType.pending, (state) => { });
        builder.addCase(updatePaymentType.fulfilled, (state, action) => {
            state.paymentTypes = [];
        });
        builder.addCase(updatePaymentType.rejected, (state) => {});

    }
});

export const paymentTypeReducer = paymentTypeSlice.reducer;
export const { } = paymentTypeSlice.actions;