import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

let TOKEN = '';
let parser_first = JSON.parse(localStorage.getItem("persist:root"));

if(parser_first){
    let parser_second = JSON.parse(parser_first.user).currentUser
    if(parser_second){
        TOKEN = parser_second.accessToken;
    }
}


export const updateUsers = createAsyncThunk("users/update", async (user) =>{
    const {userId, ...users} = user;
    const res = await userRequest.put(`users/${user.userId}`, users);
    return {...res.data, "accessToken":TOKEN };
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        //login
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //logout
        logout: (state) => {
            state.currentUser = null;
        },
        //delete
        deleteAccountStart: (state) =>{
            state.isFetching = true;
            state.error = false;
        },
        deleteAccountSuccess: (state, action) =>{
            state.isFetching = false;
        },
        deleteAccountFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    },
    extraReducers: {
        [updateUsers.pending]: (state) =>{
            state.isFetching = true;
            state.error = false;
        },
        [updateUsers.fulfilled]: (state, action) =>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        [updateUsers.rejected]: (state) =>{
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, deleteAccountStart, deleteAccountSuccess, deleteAccountFailure } = userSlice.actions;
export default userSlice.reducer;
