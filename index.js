import React from "react";
import ReactDOM from "react-dom/client";
import CustomDemo from "./src/app/header/Header"
import Footer from "./src/app/footer/Footer"
import SizeDemo from "./src/app/take-order/Order"
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Outlet, RouterProvider, createBrowserRouter,use, useNavigate } from "react-router-dom";
import LoginComponent, {login} from "./src/app/login/Login";
// import 'primeflex/primeflex.css';
const Newsletter = React.lazy(() => import("./src/app/login/Login"));

const AppComponent = () => {
    console.log("hi");
    let navigate = useNavigate();
    // setTimeout(()=>{
    //     navigate("/login");
    //    },10000)
    return (
        <div>
            <CustomDemo />
              <Outlet />
        </div>
    )
}

let router = createBrowserRouter([
    {
        path:'/',
        element:<AppComponent />,

        children:[
            {
            path:'/',
            element:<SizeDemo />
            }

        ]
        
    },
    {
        path:'/login',
        element:<Newsletter />,
        
        // lazy: ()=>import('./src/app/login/Login').then(m=>m.LoginComponent)
    }

])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {router} />);