import React, {useContext, useState } from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
  const {url, setToken}= useContext(StoreContext)
    const[currState, setCurrState] = useState('Sign Up')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })  
     const onchageHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const onLogin= async(e)=>{
        e.preventDefault()
        let newUrl = url;
        if(currState === 'Login'){
          newUrl += '/api/user/login'
        }else{
          newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl, data);
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          setShowLogin(false)
        }else{
          alert(response.data.message)
        }
      }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-popup-inputs'>
                {currState === "Login"?<></>: <input name='name' onChange={onchageHandler} value={data.name} type='text' placeholder='Your Name' required/>}
                <input name='email' onChange={onchageHandler} value={data.email} type='email' placeholder='Your Email' required/>
                <input name='password' onChange={onchageHandler} value={data.password} type='password' placeholder='Your Password' required/>
            </div>
            <button type='submit'>{currState=== "Sign Up"? "Create account": "Login"}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
           <p>
  {currState === "Login"
    ? "Create a new account?"
    : "Already have an account?"}
  {" "}
  <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
    {currState === "Login" ? "Sign Up" : "Login"}
  </span>
</p>

        </form>
    </div>
  )
}

export default LoginPopup