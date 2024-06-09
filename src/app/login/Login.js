import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/loginSlice";
import { Card } from 'primereact/card';

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    // const select = useSelector((store) => store.login.loginDetails);
    // console.log(select);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, such as validation or sending data to server
        console.log('Username:', username);
        console.log('Password:', password);
        let loginDetails = {
            "userName": username,
            "password": password
        }
        fetch("http://localhost:3000/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(loginDetails), // body data type must match "Content-Type" header
        }).then(res => {
            res.json().then(json => {
                dispatch(login(json))
                console.log(json);
                navigate("/");

            });
        });
    };

    return (
        <Card title="Login">
            <div class="flex flex-column align-items-center">
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <FloatLabel>
                            <InputText
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                            <label htmlFor="username">Username</label>
                        </FloatLabel>
                    </div>
                    <br />
                    <div className="p-field">
                        <FloatLabel>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <label htmlFor="password">Password</label>

                        </FloatLabel>
                    </div>
                    <Button type="submit" label="Login" />
                </form>
            </div>
        </Card>
    )
}
export default LoginComponent