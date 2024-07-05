import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login, logout } from "../../utils/loginSlice";

const LoginComponent = ({loginData}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
// console.log(role)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let loginDetails = {
            "userName": email,
            "password": password
        }
        fetch("http://25.17.214.78:81/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        }).then(res => {
            res.json().then(json => {

                dispatch(logout())
                dispatch(login(json[0]));
                // console.log(json);
                let [{emp_id,full_name,phone_number,type,role}] = json;
                // loginData({ role: type, name: full_name, emp_id: emp_id });
                // login({ role: type, name: full_name, emp_id: emp_id });
                if(role==='waiter')
                     navigate("/");
                else if(role === 'cook')
                    navigate("/orders")
                else if(role === 'admin')
                    navigate("/admin")

            });
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full p-3 border rounded"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-3 border rounded"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition duration-200">Login</button>
                </form>
               
            </div>
        </div>
    );
};

export default LoginComponent;
