// import React from "react";
// import ReactDOM from "react-dom/client";
// import Header from "./src/app/header/Header"
// import Footer from "./src/app/footer/Footer"
// import Waiter from "./src/app/take-order/Waiter"
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/themes/primeone-light.css';
// import { Outlet, RouterProvider, createBrowserRouter, use, useNavigate } from "react-router-dom";
// import LoginComponent, { login } from "./src/app/login/Login";
// import CurrentOrders from "./src/app/get-order/CurrentOrders";
// import { Provider } from "react-redux";
// import Item from "./src/app/admin/items";
// import AppStore,{ persistor }  from "./src/utils/appStore";
// import 'primeflex/primeflex.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import './index.css'
// import Item from "./src/app/admin/items";
// import BillingDetail from "./src/app/admin/rest_table";
// import { AuthProvider } from "./src/utils/AuthProvider";
// import { PersistGate } from 'redux-persist/integration/react';

// const LoginWithProvider = React.lazy(() => import("./src/app/login/loginWithProvider"));
// const Employee = React.lazy(() => import("./src/app/admin/employee"));
// const Items = React.lazy(() => import("./src/app/admin/items"));

// const AppComponent = () => {
//     console.log("hi");
//     let navigate = useNavigate();
//     // setTimeout(()=>{
//     //     navigate("/login");
//     //    },10000)
//     return (
//         <Provider store={AppStore}>
//             <PersistGate persistor={persistor}>
//                 <div>
//                     <Header />
//                     <Outlet />
//                 </div>
//             </PersistGate>
//         </Provider>
//     )
// }

// let router = createBrowserRouter([
//     {
//         path: '/',
//         element: <AppComponent />,
//         children: [
//             {
//                 path: '/',
//                 element: <Waiter />
//             },
//             {
//                 path: '/Orders',
//                 element: <CurrentOrders />
//             },
//             {
//                 path: '/employee',
//                 element: <Employee />
//             },
//             {
//                 path: '/items',
//                 element: <Item />
//             },
//             {
//                 path: '/billing',
//                 element: <BillingDetail />
//             }
//         ]

//     },
//     {
//         path: '/login',
//         element: <LoginWithProvider />,

//         // lazy: ()=>import('./src/app/login/Login').then(m=>m.LoginComponent)
//     },


// ])
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={router} />);
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Header from "./src/app/header/Header";
import Footer from "./src/app/footer/Footer";
import Waiter from "./src/app/take-order/Waiter";
import LoginComponent from "./src/app/login/Login";
import CurrentOrders from "./src/app/get-order/CurrentOrders";
import Item from "./src/app/admin/items";
import BillingDetail from "./src/app/admin/rest_table";
// import Unauthorized from "./src/app/Unauthorized";
import ProtectedRoute from "./src/utils/PrivateRoute";
import AppStore, { persistor } from "./src/utils/appStore";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/themes/primeone-light.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './index.css';
import { Dashboard } from "./src/app/admin/dashboard";

const Employee = React.lazy(() => import("./src/app/admin/employee"));
const Items = React.lazy(() => import("./src/app/admin/items"));
const LoginWithProvider = React.lazy(() => import("./src/app/login/loginWithProvider"));

const AppComponent = () => {
    return (
        <Provider store={AppStore}>
            <PersistGate persistor={persistor}>
                <div>
                    <Header />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </PersistGate>
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<AppComponent />}>
                <Route path="/" element={<ProtectedRoute element={Waiter} allowedRoles={['waiter']} />} />
                <Route path="/orders" element={<ProtectedRoute element={CurrentOrders} allowedRoles={['cook']} />} />
                <Route path="/admin" element={<ProtectedRoute element={Dashboard} allowedRoles={['admin']} />}>
                </Route>

                <Route
                    path="/employee"
                    element={<ProtectedRoute element={Employee} allowedRoles={['admin']} />}
                />
                <Route
                    path="/items"
                    element={<ProtectedRoute element={Items} allowedRoles={['admin']} />}
                />
                <Route
                    path="/billing"
                    element={<ProtectedRoute element={BillingDetail} allowedRoles={['admin']} />}
                />
            </Route>
            <Route path="/login" element={<LoginWithProvider />} />
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
);
