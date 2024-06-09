import { createSlice } from "@reduxjs/toolkit"


const LoginSlice = createSlice({
    name:'login',
    initialState:{
        loginDetails:[]
    },
    reducers:{
        login: (state, action) =>{
            state.loginDetails.push(action.payload);
        },
        logout: (state, action) => {
            state.loginDetails.pop();
        }
    },
    selectors:{

    }
})

export const {login,logout} = LoginSlice.actions;
export default LoginSlice.reducer;