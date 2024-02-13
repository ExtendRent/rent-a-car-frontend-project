import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddAdminModel } from "../../models/Requests/Admin/AddAdminModel";
import AdminService from "../../services/adminService";
import { UpdateAdminModel } from "../../models/Requests/Admin/UpdateAdminModel";

export const fetchAdmins = createAsyncThunk(
    "admins/fetchAdmin",
    async (_, thunkAPI) => {
      try {
        const service: AdminService = new AdminService();
        const allAdmins = await service.getAll();
        return allAdmins.data.response;
      } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
      }
    }
  );

export const addAdmin = createAsyncThunk(
    "admins/addAdmin",
    async (newAdminData: AddAdminModel, thunkAPI) => {
        try{
            const service: AdminService = new AdminService();
            const addedAdmin = await service.add(newAdminData);
            console.log(addedAdmin);
            console.log(newAdminData);
            
            return addedAdmin.data;
        }catch(error){
            console.error("Error adding admin:", error);
            throw error;
        }
    }
)

export const updateAdmin = createAsyncThunk(
    "admins/updateAdmin",
    async(updatedAdminData: UpdateAdminModel, thunkAPI) => {
        try{
            const service: AdminService = new AdminService();
            const updatedAdmin =  await service.update(updatedAdminData);
            if(updatedAdmin.data){
                return updatedAdmin.data.response
            }
            else{
                console.warn("Service response does not contain data.")
                return null;
            }
        }catch(error){
            console.error("Error updating admin", error);
            throw error;
        }
    }
)

export const deleteAdmin = createAsyncThunk(
    "admins/deleteAdmin",
    async ({ adminId }: { adminId: number; }, thunkAPI) => {
      try {
        const service: AdminService = new AdminService();
        await service.delete(adminId);
        return {
          deletedAdminId: adminId
        };
      } catch (error) {
        console.error("Error deleting admin:", error);
        throw error;
      }
    }
  );

const adminSlice = createSlice({
    name: "admin",
    initialState: {admins: [] as any[], error: null},
    reducers: {},
    extraReducers: (builder) => {

        /*-----------------------------------------------------------------*/

        builder.addCase(addAdmin.pending, (state) => {});
        builder.addCase(addAdmin.fulfilled,(state, action) => {
            state.admins.push(action.payload);
        })
        builder.addCase(addAdmin.rejected, (state) => {})

        /*-----------------------------------------------------------------*/

        builder.addCase(fetchAdmins.pending, (state) => {});
        builder.addCase(fetchAdmins.fulfilled, (state, action) => {
            state.admins = action.payload;
        });
        builder.addCase(fetchAdmins.rejected, (state) => {});

        /*-----------------------------------------------------------------*/

        builder.addCase(updateAdmin.pending, (state) => {});
        builder.addCase(updateAdmin.fulfilled, (state, action) => {
            state.admins = [];
        });
        builder.addCase(updateAdmin.rejected, (state) => {});

        /*-----------------------------------------------------------------*/

        builder.addCase(deleteAdmin.pending, (state) => {});
        builder.addCase(deleteAdmin.fulfilled, (state, action) => {
            const deletedAdminId = action.payload.deletedAdminId;
            state.admins = state.admins.filter(admin => admin.id !== deletedAdminId);
        });
        builder.addCase(deleteAdmin.rejected, (state) => {});
    }

})

export const adminReducer = adminSlice.reducer;
export const {} = adminSlice.actions;