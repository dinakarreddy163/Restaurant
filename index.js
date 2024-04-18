import React from "react";
import ReactDOM from "react-dom/client";
import CustomDemo from "./src/app/header/Header"
import Footer from "./src/app/footer/Footer"
import SizeDemo from "./src/app/take-order/Order"
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

const AppComponent = () => {
    return (
        <div>
            <CustomDemo />
        <SizeDemo />
            <Footer />
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent />);