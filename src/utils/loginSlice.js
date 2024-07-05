import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        loginDetails: []
    },
    reducers: {
        setLoginDetails: (state, action) => {
            state.loginDetails.push(action.payload);
        },
        clearLoginDetails: (state) => {
            state.loginDetails = [];
        }
    },
});

export const { setLoginDetails, clearLoginDetails } = LoginSlice.actions;

export const login = (loginDetails) => (dispatch) => {
    dispatch(setLoginDetails(loginDetails));
};

export const logout = () => (dispatch) => {
    dispatch(clearLoginDetails());
};

export default LoginSlice.reducer;
