import './App.css';
import AllTodos from './screens/all-todos/AllTodos';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"

function App() {

   const navigate = useNavigate()

   const logOut = () => {
      navigate("/login");
      window.localStorage.removeItem("token");
   };

   const token = localStorage.getItem('token')

   const allTodos = () => {
      navigate("/home/all-todos")
   }
   const activeTodos = () => {
      navigate("/home")
   }

  return (
     <>
        <div
           style={{
              display: "flex",
              algnItems: "center",
              justifyContent: "space-between",
              padding: "0 3rem",
           }}
        >
           <p style={{fontSize: "1.5rem", fontWeight: 700}}>TODO App</p>
           {token ? (
              <div className="btn-div">
                 {" "}
                 <button onClick={allTodos}>All Todos</button>{" "}
                 <button onClick={activeTodos}>Active Todos</button>{" "}
                 <button className="logout-btn" onClick={logOut}>
                    LogOut
                 </button>{" "}
              </div>
           ) : (
              <></>
           )}
        </div>
        <BrowserRouter>
           <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<SignUp />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/home/all-todos" element={<AllTodos />}></Route>
           </Routes>
        </BrowserRouter>
     </>
  );
}

export default App;
