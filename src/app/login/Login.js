import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const LoginComponent = ()=>{
    const [login,setLogin] = useState(false);
   let navigate = useNavigate()
  
   
    return (<div>
       <button onClick={()=>{
        navigate("/");
        // history.push("/")
       }}>Sigin</button>
    </div>)
}
export default LoginComponent