import { useAuth } from "../context/Authcontext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login(){

const {login} = useAuth();
const navigate = useNavigate();
const location = useLocation();

const handleLogin = () => {

login();

const from = location.state?.from?.pathname || "/cart";
navigate(from,{replace:true});

};

return(

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"80vh",
flexDirection:"column",
gap:"25px"
}}>

<h1>Login</h1>

<button
onClick={handleLogin}
style={{
padding:"14px 32px",
fontSize:"16px",
borderRadius:"8px",
border:"none",
cursor:"pointer",
background:"#222",
color:"white"
}}
>
Login as Guest
</button>

</div>

);

}