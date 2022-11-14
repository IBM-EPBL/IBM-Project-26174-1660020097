import React,{useEffect, useState} from 'react'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Register.css';


function Register() {
  let navigate=useNavigate();
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [conPassword,setConPassword]=useState("")

  const [message,setMessage]=useState("")
  const [passwordShown, setPasswordShown] = useState(false)
  const [usernameExists,setUsernameExists]=useState("")
  
  
 
  //this is optional
  useEffect(()=>{
    setUsernameExists("")
  },[])

  const handleSubmit=()=>{
    setMessage("")
    setUsernameExists("")
    if (password!==conPassword) {
      setMessage("Passwords should match")
    }
    else {
      setMessage("")
      setUsernameExists("This username already exists")
    }
		if (password===conPassword) {
      Axios.post("http://localhost:3001/register",{username:username,password:password}).then((response)=>{
        if (response.data.message) { 
          navigate("/")  
          setTimeout(()=> {
            alert("successfully registered");
          }, 100);          
        } 
      })
    }  
  }

  const handleReset = () => {
    setUsernameExists("")
  }


  const togglePasswordIcon = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <div class="bg-img bg-img-login">
        <div class="register-container">
          <form>
            <div class="crude-title title-position-login">Crude 7 Predictor</div>
            <label>First Name</label>
            <br></br>
            <input type="text" placeholder='Name' onChange={(e)=>{
              setFirstName(e.target.value)
            }} required />
            <br></br>
            <label>Last Name</label>
            <br></br>
            <input type="text" placeholder='Last name' onChange={(e)=>{
              setLastName(e.target.value)
            }} required />
            <br></br>
            <label>Username</label>
            <br></br>
            <input type="text" placeholder='Username' onChange={(e)=>{
              setUsername(e.target.value)
            }} required />
            <br></br>
            <div class="wrong wrong-match">{usernameExists}</div>
            <br></br>
            <label>Password</label>
            <br></br>
            <input type={passwordShown ? "text" : "password"} placeholder='Password'  onChange={(e)=>{
              setPassword(e.target.value)
            }} required/>{passwordShown ? <span onClick={togglePasswordIcon}><AiFillEye /></span> : <span onClick={togglePasswordIcon}><AiFillEyeInvisible /></span>}
            <br></br>
            <label>Confirm password</label>
            <br></br>
            <input type={passwordShown ? "text" : "password"} placeholder='Re-type password' onChange={(e)=>{
              setConPassword(e.target.value)
            }} required />{passwordShown ? <span onClick={togglePasswordIcon}><AiFillEye /></span> : <span onClick={togglePasswordIcon}><AiFillEyeInvisible /></span>}
            
            <div class="wrong wrong-match">{message}</div>
                  
            <input type="reset" onClick={handleReset} class="reset-btn" />
            <br></br><br></br>
            <div class="click-here-register">Already have an account ? <Link to="/" class="blue-text">click here</Link></div>
          </form>
          <button type ="submit" disabled={!firstName || !lastName || !username || !password || !conPassword } onClick={handleSubmit} class="login-btn submit-btn">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Register