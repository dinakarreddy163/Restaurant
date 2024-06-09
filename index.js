import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/app/header/Header"
import Footer from "./src/app/footer/Footer"
import Waiter from "./src/app/take-order/Waiter"
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/themes/primeone-light.css';
import { Outlet, RouterProvider, createBrowserRouter, use, useNavigate } from "react-router-dom";
import LoginComponent, { login } from "./src/app/login/Login";
import CurrentOrders from "./src/app/get-order/CurrentOrders";
import { Provider } from "react-redux";
import AppStore from "./src/utils/appStore";
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './index.css'
import Item from "./src/app/admin/items";
const LoginWithProvider = React.lazy(() => import("./src/app/login/loginWithProvider"));
const Employee = React.lazy(() => import("./src/app/admin/employee"));
const Items = React.lazy(() => import("./src/app/admin/items"));

const AppComponent = () => {
    console.log("hi");
    let navigate = useNavigate();
    // setTimeout(()=>{
    //     navigate("/login");
    //    },10000)
    return (
        <Provider store={AppStore}>
            <div>
                <Header />
                <Outlet />
            </div>
        </Provider>
    )
}

let router = createBrowserRouter([
    {
        path: '/',
        element: <AppComponent />,
        children: [
            {
                path: '/',
                element: <Waiter />
            },
            {
                path: '/Orders',
                element: <CurrentOrders />
            },
            {
                path: '/employee',
                element: <Employee />
            },
            {
                path: '/items',
                element: <Items />
            }
        ]

    },
    {
        path: '/login',
        element: <LoginWithProvider />,

        // lazy: ()=>import('./src/app/login/Login').then(m=>m.LoginComponent)
    },


])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);