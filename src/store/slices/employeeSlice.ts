import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddEmployeeModel } from "../../models/Requests/Employee/AddEmployeeModel";
import EmployeeService from "../../services/employeeService";
import { UpdateEmployeeModel } from "../../models/Requests/Employee/UpdateEmployeeModel";
import employeeService from "../../services/employeeService";


export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (_, thunkAPI) => {
        try {
            const allEmployees = await employeeService.getAll();
            return allEmployees.data.response;

        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }
);

export const getByIdEmployee = createAsyncThunk(
    "employees/getByIdEmployees",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await employeeService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (newEmployeeData: AddEmployeeModel, thunkAPI) => {
        try {
            const addedEmployee = await employeeService.add(newEmployeeData);

            return addedEmployee.data;

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.response && (error.response.data.response.errorCode === 3000 || error.response.data.response.errorCode === 2016 ||error.response.data.response.errorCode === 2014 )) {
                const details = error.response.data.response.details[0];
                throw details;
              } 
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "employees/updateEmployee",
    async (updatedEmployeeData: UpdateEmployeeModel, thunkAPI) => {
        try {
            const updatedEmployee = await employeeService.update(updatedEmployeeData);
            if (updatedEmployee.data) {
                return updatedEmployee.data.response;
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

export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async ({ employeeId }: { employeeId: number; }, thunkAPI) => {
        try {
            await employeeService.delete(employeeId);
            return {
                deletedEmployeeId: employeeId
            };
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
);

export const getEmployeeCountIsDeleted = createAsyncThunk(
    "employees/getEmployeeCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
      try {
        const getCountIsDelete = await employeeService.getEmployeeCountIsDeleted(deleted);
        return getCountIsDelete.data;
  
      } catch (error) {
        console.error("Error adding getCountIsDeleted:", error);
        throw error;
      }
    }
  );

const employeeSlice = createSlice({
    name: "employee",
    initialState: { employees: [] as any[], error: null as string | null, employeeCountIsDeleted: 0 },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchEmployees.pending, (state) => { });
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
        });
        builder.addCase(fetchEmployees.rejected, (state) => { });

        /*-----------------*/

        builder.addCase(getByIdEmployee.pending, (state) => { });
        builder.addCase(getByIdEmployee.fulfilled, (state, action) => {
            state.employees = action.payload;
        });
        builder.addCase(getByIdEmployee.rejected, (state) => {
        });

        /*-----------------*/

        builder.addCase(getEmployeeCountIsDeleted.pending, (state) => { });
        builder.addCase(getEmployeeCountIsDeleted.fulfilled, (state, action) => {
            state.employeeCountIsDeleted = action.payload.response;
        });
        builder.addCase(getEmployeeCountIsDeleted.rejected, (state) => {
        });

         /*-----------------*/

        builder.addCase(addEmployee.pending, (state) => { });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.error = null;
            state.employees.push(action.payload);
        });
        builder.addCase(addEmployee.rejected, (state, action) => { 
            state.error = action.error.message || "Bir hata oluştu.";
        });

        /*-----------------*/

        builder.addCase(updateEmployee.pending, (state) => { });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.error = null;
            state.employees = [];
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.error = action.error.message || "Bir hata oluştu.";
         });

        /*-----------------*/

        builder.addCase(deleteEmployee.pending, (state) => { });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            const deletedEmployeeId = action.payload.deletedEmployeeId;
            state.employees = state.employees.filter(employee => employee.id !== deletedEmployeeId);
        });
        builder.addCase(deleteEmployee.rejected, (state) => { });

    },

});

export const employeeReducer = employeeSlice.reducer;
export const { } = employeeSlice.actions;