import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { PageModel } from "../../models/Responses/Pageable/pageModel";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (page: PageModel, thunkAPI) => {
        try {
            const allUsers = await userService.getAll(page);
            return allUsers.data.response;
        } catch (error) {
            console.error("Error fetching users: ", error);
            throw error;
        }
    }
)

export const getByIdUser = createAsyncThunk(
    "users/getByIdUsers",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await userService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const updateUserBlock = createAsyncThunk(
    "users/updateUserBlock",
    async (id: number, thunkAPI) => {
        try {
            return (await userService.updateUserBlock(id)).data.response;
        } catch (error) {
            console.error("Error updating user: ", error);
            throw error;
        }
    }
)

export const getUserCountIsDeleted = createAsyncThunk(
    "users/getUserCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
        try {
            const getByDeleted = await userService.getUserCountIsDeleted(deleted);
            return getByDeleted.data;

        } catch (error) {
            console.error("Error adding getByDeleted:", error);
            throw error;
        }
    }
);
export const changePassword = createAsyncThunk(
    "users/changePassword",
    async (changeNewPassword: {id : number,password:string}, thunkAPI) => {
        try {
            const getChangePass = await userService.updatePassword(changeNewPassword);
            
            return getChangePass.data.response;

        } catch (error) {
            console.error("Error adding getByDeleted:", error);
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: { users: [] as any[], error: null,userCountIsDeleted: 0 },
    reducers: {},
    extraReducers: (builder) => {

        /*-----------------*/

        builder.addCase(fetchUsers.pending, (state) => { });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state) => { });

        /*-----------------*/

        builder.addCase(getByIdUser.pending, (state) => { });
        builder.addCase(getByIdUser.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(getByIdUser.rejected, (state) => {
        });
        
        /*-----------------*/

        builder.addCase(updateUserBlock.pending, (state) => { });
        builder.addCase(updateUserBlock.fulfilled, (state, action) => {
            state.users = [];
        });
        builder.addCase(updateUserBlock.rejected, (state) => { });

        /*----------------*/

        builder.addCase(getUserCountIsDeleted.pending, (state) => { });
        builder.addCase(getUserCountIsDeleted.fulfilled, (state, action) => {
            state.userCountIsDeleted  = action.payload.response;
        });
        builder.addCase(getUserCountIsDeleted.rejected, (state) => {
        });

    }
})
export const userReducer = userSlice.reducer;
export const { } = userSlice.actions;