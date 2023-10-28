import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
         alert("Passwords do not match");
         setFormData({ ...formData, confirmPassword: "" });
      } else {
         const userObj = {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            password: formData.password,
         };
         axios
            .post(
               `${process.env.REACT_APP_BACKEND_API_URL}/user/register`,
               userObj
            )
            .then((resp) => {
               alert(resp.data.message)
               if(resp.data.status===201){
                  window.location.href = "/login"
               }
            })
            .catch((err) => {
               alert(err.response.data.message)
            });
      }
   };

   return (
      <div className="signup-container">
         <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
               type="text"
               name="name"
               placeholder="Name"
               value={formData.name}
               onChange={handleChange}
               required
            />
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               required
            />
            <input
               type="text"
               name="username"
               placeholder="Username"
               value={formData.username}
               onChange={handleChange}
               required
            />
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={formData.password}
               onChange={handleChange}
               required
            />
            <input
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password"
               value={formData.confirmPassword}
               onChange={handleChange}
               required
            />
            <button type="submit">Sign Up</button>
         <Link to="/login">Already Registered? Login...</Link>
         </form>
      </div>
   );
}

export default SignUp;
