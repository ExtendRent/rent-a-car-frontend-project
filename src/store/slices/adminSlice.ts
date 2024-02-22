import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddAdminModel } from "../../models/Requests/Admin/AddAdminModel";
import AdminService from "../../services/adminService";
import { UpdateAdminModel } from "../../models/Requests/Admin/UpdateAdminModel";
import adminService from "../../services/adminService";

export const fetchAdmins = createAsyncThunk(
    "admins/fetchAdmin",
    async (_, thunkAPI) => {
      try {
        const allAdmins = await adminService.getAll();
        return allAdmins.data.response;
      } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
      }
    }
  );

  export const getByIdAdmin = createAsyncThunk(
    "admins/getByIdAdmins",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await adminService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const getCountIsDeleted = createAsyncThunk(
    "admins/getCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
        try {
            const getCountIsDelete = await adminService.getCountIsDeleted(deleted);
            return getCountIsDelete.data.response;

        } catch (error) {
            console.error("Error adding getCountIsDeleted:", error);
            throw error;
        }
    }
);

export const addAdmin = createAsyncThunk(
    "admins/addAdmin",
    async (newAdminData: AddAdminModel, thunkAPI) => {
        try{
            const addedAdmin = await adminService.add(newAdminData);
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
            const updatedAdmin =  await adminService.update(updatedAdminData);
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
        await adminService.delete(adminId);
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

        builder.addCase(getByIdAdmin.pending, (state) => { });
        builder.addCase(getByIdAdmin.fulfilled, (state, action) => {
            state.admins = action.payload;
        });
        builder.addCase(getByIdAdmin.rejected, (state) => {
        });

        /*-----------------------------------------------------------------*/

        builder.addCase(getCountIsDeleted.pending, (state) => { });
        builder.addCase(getCountIsDeleted.fulfilled, (state, action) => {
            state.admins = action.payload;
        });
        builder.addCase(getCountIsDeleted.rejected, (state) => {
        });


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