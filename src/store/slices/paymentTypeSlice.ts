import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentTypeService from "../../services/paymentTypeService";
import { UpdatePaymentTypeModel } from "../../models/Requests/PaymentType/UpdatePaymentTypeModel";
import paymentTypeService from "../../services/paymentTypeService";

export const fetchPaymentTypes = createAsyncThunk(
    "paymentTypes/fetchPaymentTypes",
    async (_, thunkAPI) => {
        try {
            const allPaymentTypes = await paymentTypeService.getAll();
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
            const updatedPaymentType = await paymentTypeService.update(updatedPaymentTypeData);
            if (updatedPaymentType.data) {
                return updatedPaymentType.data.response;
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

export const getByIdPaymentType = createAsyncThunk(
    "paymentTypes/getByIdPaymentTypes",
    async ({ id }: { id: number; }, thunkAPI) => {
      try {
        const getByIded = await paymentTypeService.getById(id);
        return getByIded.data.response;
  
      } catch (error) {
        console.error("Error adding getByIded:", error);
        throw error;
      }
    }
  );

const paymentTypeSlice = createSlice({
    name: "paymentType",
    initialState: { paymentTypes: [] as any[], error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPaymentTypes.pending, (state) => { });
        builder.addCase(fetchPaymentTypes.fulfilled, (state, action) => {
            state.paymentTypes = action.payload;
        });
        builder.addCase(fetchPaymentTypes.rejected, (state) => { });
        

        builder.addCase(updatePaymentType.pending, (state) => { });
        builder.addCase(updatePaymentType.fulfilled, (state, action) => {
            state.error = null;
            state.paymentTypes = [];
        });
        builder.addCase(updatePaymentType.rejected, (state, action) => {
            state.error = action.error.message || "Bir hata oluştu.";
        });

    }
});

export const paymentTypeReducer = paymentTypeSlice.reducer;
export const { } = paymentTypeSlice.actions;