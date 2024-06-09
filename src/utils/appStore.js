
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./loginSlice";

const AppStore = configureStore({
    reducer:{
        login:loginReducer
    }
});

export default AppStore