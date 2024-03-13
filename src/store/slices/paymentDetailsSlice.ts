import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentDetailsService from "../../services/paymentDetailsService";
import { UpdatePaymentDetailsModel } from "../../models/Requests/PaymentDetails/UpdatePaymentDetailsModel";
import paymentDetailsService from "../../services/paymentDetailsService";

export const fetchPaymentDetails = createAsyncThunk(
    "paymentDetails/fetchPaymentDetails",
    async (_, thunkAPI) => {
        try {
            const allPaymentDetails = await paymentDetailsService.getAll();
            return allPaymentDetails.data.response;

        } catch (error) {
            console.error("Error fetching payment details:", error);
            throw error;
        }
    }
);


export const  getTotalIncomePaymentDetails = createAsyncThunk(
    "paymentDetails/ getTotalIncomePaymentDetails",
    async (_, thunkAPI) => {
        try {
            const allPaymentDetails = await paymentDetailsService. getTotalIncome();
            return allPaymentDetails.data.response;

        } catch (error) {
            console.error("Error fetching total income payment details:", error);
            throw error;
        }
    }
);


export const getByIdPaymentDetails = createAsyncThunk(
    "paymentDetails/getByIdPaymentDetails",
    async ({ id }: { id: number; }, thunkAPI) => {
      try {
        const getByIded = await paymentDetailsService.getById(id);
        return getByIded.data.response;

      } catch (error) {
        console.error("Error adding getByIded:", error);
        throw error;
      }
    }
  );

  export const getYearlyIncomePaymentDetails = createAsyncThunk(
    "paymentDetails/getYearlyIncomePaymentDetails",
    async ({ year }: { year: number; }, thunkAPI) => {
      try {
        const getYearlyIncomed = await paymentDetailsService.getYearlyIncome(year);
        return getYearlyIncomed.data.response;

      } catch (error) {
        console.error("Error adding getYearlyIncomed:", error);
        throw error;
      }
    }
  );

  export const getMonthlyIncomePaymentDetails = createAsyncThunk(
    "paymentDetails/getMonthlyIncomePaymentDetails",
    async ({ startDate, endDate }: { startDate: Date | string, endDate: Date | string; }, thunkAPI) => {
      try {
        const getMonthlyIncomed = await paymentDetailsService.getMonthlyIncome( startDate, endDate );
        return getMonthlyIncomed.data.response;

      } catch (error) {
        console.error("Error adding get monthly incomed:", error);
        throw error;
      }
    }
  );


  export const getFilterPaymentDetails = createAsyncThunk(
    "paymentDetails/getFilterPaymentDetails",
    async ({ filters }: { filters: { minAmount?: number, maxAmount?: number, minDate?: Date, maxDate?: Date, isDeleted?: boolean } }, thunkAPI) => {
      try {
        const getFiltered = await paymentDetailsService.getFilter(filters);
        return getFiltered.data.response;

      } catch (error) {
        console.error("Error adding get filtered:", error);
        throw error;
      }
    }
  );


export const updatePaymentDetails = createAsyncThunk(
    "paymentDetails/updatePaymentDetails",
    async (updatedPaymentDetailsData: UpdatePaymentDetailsModel, thunkAPI) => {
        try {

            const updatedPaymentDetails = await paymentDetailsService.update(updatedPaymentDetailsData);
            if (updatedPaymentDetails.data) {
                return updatedPaymentDetails.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error: any) {
          if (error && error.response && error.response.data.response.errorCode === 2011) {
            const details = error.response.data.response.details[0];
           throw details;
        }
        }
    }
);



const paymentDetailsSlice = createSlice({
    name: "paymentDetails",
    initialState: { paymentDetails: [] as any[], error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPaymentDetails.pending, (state) => { });
        builder.addCase(fetchPaymentDetails.fulfilled, (state, action) => {
            state.paymentDetails = action.payload;
        });
        builder.addCase(fetchPaymentDetails.rejected, (state) => { });


        builder.addCase(getTotalIncomePaymentDetails.pending, (state) => { });
        builder.addCase(getTotalIncomePaymentDetails.fulfilled, (state, action) => {
            state.paymentDetails = action.payload;
        });
        builder.addCase(getTotalIncomePaymentDetails.rejected, (state) => { });


        builder.addCase(getMonthlyIncomePaymentDetails.pending, (state) => { });
        builder.addCase(getMonthlyIncomePaymentDetails.fulfilled, (state, action) => {
            state.paymentDetails = action.payload;
        });
        builder.addCase(getMonthlyIncomePaymentDetails.rejected, (state) => { });


        builder.addCase(getByIdPaymentDetails.pending, (state) => {});
        builder.addCase(getByIdPaymentDetails.fulfilled, (state, action) => {
          state.paymentDetails = action.payload;
        });
        builder.addCase(getByIdPaymentDetails.rejected, (state) => {
        });



        builder.addCase(getYearlyIncomePaymentDetails.pending, (state) => {});
        builder.addCase(getYearlyIncomePaymentDetails.fulfilled, (state, action) => {
          state.paymentDetails = action.payload;
        });
        builder.addCase(getYearlyIncomePaymentDetails.rejected, (state) => {
        });
        

        builder.addCase(getFilterPaymentDetails.pending, (state) => {});
        builder.addCase(getFilterPaymentDetails.fulfilled, (state, action) => {
          state.paymentDetails = action.payload;
        });
        builder.addCase(getFilterPaymentDetails.rejected, (state) => {
        });
        


        builder.addCase(updatePaymentDetails.pending, (state) => { });
        builder.addCase(updatePaymentDetails.fulfilled, (state, action) => {
          state.error = null;
            state.paymentDetails = [];
        });
        builder.addCase(updatePaymentDetails.rejected, (state, action) => { 
          state.error = action.error.message || "Bir hata oluştu.";
        });

    }
});

export const paymentDetailsReducer = paymentDetailsSlice.reducer;
export const { } = paymentDetailsSlice.actions;