import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddEmployeeModel } from "../../models/Requests/AddEmployeeModel";
import EmployeeService from "../../services/employeeService";
import { UpdateEmployeeModel } from "../../models/Requests/UpdateEmployeeModel";


export const fetchEmployees = createAsyncThunk(
    "employees/fetchEmployees",
    async (_, thunkAPI) => {
        try {
            const service: EmployeeService = new EmployeeService();
            const allEmployees = await service.getAll();
            return allEmployees.data.response;

        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error;
        }
    }
);


export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (newEmployeeData: AddEmployeeModel, thunkAPI) => {
        try {
            const service: EmployeeService = new EmployeeService();
            const addedEmployee = await service.add(newEmployeeData);

            return addedEmployee.data;

        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "employees/updateEmployee",
    async (updatedEmployeeData: UpdateEmployeeModel, thunkAPI) => {
        try {

            const service: EmployeeService = new EmployeeService();
            const updatedEmployee = await service.update(updatedEmployeeData);
            if (updatedEmployee.data) {
                return updatedEmployee.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async ({ employeeId }: { employeeId: number; }, thunkAPI) => {
        try {
            const service: EmployeeService = new EmployeeService();
            await service.delete(employeeId);
            return {
                deletedEmployeeId: employeeId
            };
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }
);



const employeeSlice = createSlice({
    name: "employee",
    initialState: { employees: [] as any[], error: null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchEmployees.pending, (state) => { });
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
        });
        builder.addCase(fetchEmployees.rejected, (state) => { });


        builder.addCase(addEmployee.pending, (state) => { });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.employees.push(action.payload);
        });
        builder.addCase(addEmployee.rejected, (state) => { });

        builder.addCase(updateEmployee.pending, (state) => { });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.employees = [];
        });
        builder.addCase(updateEmployee.rejected, (state) => { });

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