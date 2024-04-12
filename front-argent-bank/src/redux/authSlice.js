import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        loginUserSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        loginUserFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        // autres reducers
    },
});

export const { loginUserSuccess, loginUserFailure } = authSlice.actions;
export default authSlice.reducer;
