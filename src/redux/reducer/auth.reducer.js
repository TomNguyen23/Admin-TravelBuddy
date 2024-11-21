import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setCredentials(state, action) {
            const { accessToken, adminInfo } = action.payload;
            state.user = adminInfo;
            state.token = accessToken;
        },

        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;