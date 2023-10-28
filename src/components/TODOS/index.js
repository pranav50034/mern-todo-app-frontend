import React from "react";
import "./style.css";
import axios from "axios";

const TODOS = ({todos, setTodos}) => {

   const token = localStorage.getItem('token')

   const complete = async (id) => {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/todo/complete-todo`, {id}, {
         headers: {
            Authorization: token
         }
      })
      if(response.data.status===200) {
         const resp = await axios.get(
            `${process.env.REACT_APP_BACKEND_API_URL}/todo/todos`,
            {
               headers: {
                  Authorization: token,
               },
            }
         );
         setTodos(resp.data.data);
      }
   }

   return (
      <div className="todo">
        {todos.length ? <table>
            <tbody style={{fontSize: "1.6rem"}}>
               <tr>
                  <th style={{ maxWidth: "600px", minWidth: "300px" }}>TODO</th>
                  <th style={{ minWidth: "400px" }}>STATUS</th>
                  <th style={{ minWidth: "200px" }}>Deadline</th>
                  <th style={{ minWidth: "200px" }}>Priority</th>
               </tr>
               {todos &&
                  todos.map((todo, index) => {if(!todo.isCompleted){return (
                     <tr key={index}>
                        <td>{todo.task}</td>
                        <td className="interactive-td">
                           {todo.isCompleted ? "Complete" : "Incomplete"}
                        </td>
                        <td className="interactive-td">{todo.deadline}</td>
                        <td className="interactive-td">{todo.priority}</td>
                        <td>
                           <button onClick={() => complete(todo._id)}>
                              Mark as Complete
                           </button>
                        </td>
                     </tr>
                  )}})}

            </tbody>
         </table> : <p style={{fontSize: "2rem", fontWeight: 600, margin: "1rem"}}>No Todos Added!</p>}
         
      </div>
   );
};

export default TODOS;
