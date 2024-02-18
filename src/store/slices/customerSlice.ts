import { AddCustomerModel } from '../../models/Requests/Customer/AddCustomerModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../../services/customerService";
import { UpdateCustomerModel } from '../../models/Requests/Customer/UpdateCustomerModel';


export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomer",
  async (_, thunkAPI) => {
    try {
      const service: CustomerService = new CustomerService();
      const allCustomers = await service.getAll();
      return allCustomers.data.response;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }
);

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


export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updatedCustomerData: UpdateCustomerModel, thunkAPI) => {
    try {
      const service: CustomerService = new CustomerService();
      const updatedCustomer = await service.update(updatedCustomerData);
      if (updatedCustomer.data) {
        return updatedCustomer.data.response
      }
      else {
        console.warn("Service response does not contain data.")
        return null;
      }
    } catch (error) {
      console.error("Error updating customer", error);
      throw error;
    }
  }
)

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async ({ customerId }: { customerId: number; }, thunkAPI) => {
    try {
      const service: CustomerService = new CustomerService();
      await service.delete(customerId);
      return {
        deletedCustomerId: customerId
      };
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: { customers: [] as any[], error: null },
  reducers: {},
  extraReducers: (builder) => {

    /*-----------------------------------------------------------------*/

    builder.addCase(addCustomer.pending, (state) => { });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload);
    });
    builder.addCase(addCustomer.rejected, (state) => { });


    /*-----------------------------------------------------------------*/

    builder.addCase(fetchCustomers.pending, (state) => { });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state) => { });

    /*-----------------------------------------------------------------*/

    builder.addCase(updateCustomer.pending, (state) => { });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customers = [];
    });
    builder.addCase(updateCustomer.rejected, (state) => { });

    /*-----------------------------------------------------------------*/

    builder.addCase(deleteCustomer.pending, (state) => { });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      const deletedCustomerId = action.payload.deletedCustomerId;
      state.customers = state.customers.filter(customer => customer.id !== deletedCustomerId);
    });
    builder.addCase(deleteCustomer.rejected, (state) => { });

  },
});

export const customerReducer = customerSlice.reducer;
export const { } = customerSlice.actions;
