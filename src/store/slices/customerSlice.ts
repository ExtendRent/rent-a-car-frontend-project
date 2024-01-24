import { AddCustomerModel } from './../../models/Requests/AddCustomerModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../../services/customerService";

export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async (addCustomerData: AddCustomerModel     
      , thunkAPI) => {
      try {
        const service: CustomerService = new CustomerService();
        const addedCustomer = await service.add(addCustomerData);
        return addedCustomer.data;
      } catch (error) {
        console.error("Error adding customer:", error);
        throw error;
      }
    }
  );


  const customerSlice = createSlice({
    name: "customer",
    initialState: { customers: [] as any[],error:null },
    reducers: {},
    extraReducers: (builder) => {
     
  
      builder.addCase(addCustomer.pending, (state) => {});
      builder.addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
        
      });
      builder.addCase(addCustomer.rejected, (state) => {
        
      });
  
    },
  });
  
  export const customerReducer = customerSlice.reducer;
  export const {} = customerSlice.actions;
  