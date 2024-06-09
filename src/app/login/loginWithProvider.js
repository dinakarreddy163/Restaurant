import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import LoginComponent from "./Login";
import AppStore from "../../utils/appStore";

const LoginWithProvider= () => {
    console.log("dhj");
    return (
     <Provider store={AppStore}>
        <LoginComponent />
     </Provider>
    )
}
export default LoginWithProvider