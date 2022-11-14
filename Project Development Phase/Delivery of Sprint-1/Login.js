import React,{useState,useEffect} from 'react';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { login, logout } from '../Features/user'
import './Login.css';

const Login=()=> {
  let navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [passwordShown, setPasswordShown] = useState(false)
  const [wrongCredentials,setWrongCredentials]=useState("")
  const dispatch = useDispatch();
  
  //this is optional
  useEffect(()=>{
    setWrongCredentials("")
  },[])

  function handleLogin() {
    Axios.post("http://localhost:3001/",{username:username,password:password}).then((response)=>{
      if (response.data.message) {
        dispatch(login({ name: username, password: password }));
        navigate("/home")
      }
    })
    setWrongCredentials("Wrong username/password combination")
  }

  function handleReset() {
    setUsername("")
    setPassword("")
  }

  const togglePasswordIcon = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div>
      <div class="bg-img bg-img-login">
        <div class="login-container">
          <form>
            <div class="crude-title title-position-login">Crude 7 Predictor</div>
            <label>Username</label>
            <br></br>
            <input type="text" placeholder='Username' onChange={(e)=>{
              setUsername(e.target.value)
            }} required/>
            <br></br>
            
            <label>Password</label>
            <br></br>
            <input type={passwordShown ? "text" : "password"} placeholder='Password'  onChange={(e)=>{
              setPassword(e.target.value)
            }} required/>{passwordShown ? <span onClick={togglePasswordIcon}><AiFillEye /></span> : <span onClick={togglePasswordIcon}><AiFillEyeInvisible /></span>}
            
            <input type="reset" onClick={handleReset} class="reset-btn"/>
            <br></br><br></br>
            <br></br><br></br>
            <div class="click-here-login">Don't have an account ? <Link to="/register" class="blue-text">click here</Link></div>
          </form>
          <div class="wrong wrong-combination">{wrongCredentials}</div>
          <button disabled={!username || !password } onClick={handleLogin} class="login-btn">Login</button>
          
        </div>
      </div>
      
    </div>

  );
}

export default Login;



