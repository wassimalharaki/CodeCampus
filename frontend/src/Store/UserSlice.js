import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = userSlice.actions;
export const currentUser = (state) => state.user;
export default userSlice.reducer;