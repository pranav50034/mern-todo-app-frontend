import React, { useEffect, useState } from 'react';
import "./Home.css"
import TODOS from '../../components/TODOS';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {

   const [todos, setTodos] = useState([]);

   const [newTodo, setNewTodo] = useState({});

   const token = localStorage.getItem("token");

   const navigate = useNavigate();

   const [todoData, setTodoData] = useState({
      task: "",
      deadline: "",
      priority: "High"
   });

   const handleClick = async (e) => {
      e.preventDefault();
      const todoo=await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/todo/create-todo`, todoData, {
         headers: {
            Authorization: token
         }
      })

      setNewTodo(todoo.data.data);

      setTodoData({
         task: "",
         deadline: "",
         priority: "High",
      });
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setTodoData({ ...todoData, [name]: value });
   }

   

   useEffect(() => {
      if(!token) {
         navigate("/login");
      }else {
         (async () => {
            const resp = await axios.get(
               `${process.env.REACT_APP_BACKEND_API_URL}/todo/todos`,
               {
                  headers: {
                     Authorization: token,
                  },
               }
            );
            setTodos(resp.data.data);
         })();
      }
   }, [token, newTodo]);

  return (
     <div className="home">
        <form
           onSubmit={(e) => {
              handleClick(e);
           }}
        >
           <div style={{ marginBottom: "1rem" }}>
              <input
                 id="input"
                 onChange={handleChange}
                 type="text"
                 required
                 name= "task"
                 className="input"
              />
              <label id="placeholder" htmlFor="input">
                 TODO
              </label>
              <button type="submit" className="add-btn">
                 Create TODO
              </button>
           </div>
           <label htmlFor="priority">Priority</label>

           <select onChange={handleChange} name="priority" id="priority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
           </select>

           <input id='date-input' name='deadline' required onChange={handleChange} type="date" />

        </form>
        <TODOS todos={todos} setTodos={setTodos} />
     </div>
  );
}

export default Home