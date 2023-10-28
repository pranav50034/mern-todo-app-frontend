import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   };

   const handleLogin = (e) => {
      e.preventDefault();
      const userObj = {
         loginId: email,
         password: password,
      };
      axios
         .post(`${process.env.REACT_APP_BACKEND_API_URL}/user/login`, userObj)
         .then((resp) => {
            if(resp.data.status===200){
               window.localStorage.setItem("token", resp.data.data.token)
               window.location.href = "/home"
            }else{
               alert(resp.data.message);
            }
         })
         .catch((err) => {
            alert(err.response.data.message);
         });
   };

   return (
      <div className="login-container">
         <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
               <input
                  type="text"
                  placeholder="Email or Username"
                  value={email}
                  onChange={handleEmailChange}
                  required
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
               />
               <button style={{marginBottom: "1rem"}} type="submit">Login</button>
            </form>
            <Link to="/">New user? Login..</Link>
         </div>
      </div>
   );
}

export default Login;
