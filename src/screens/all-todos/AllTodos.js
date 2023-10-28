import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const AllTodos = () => {

    const [todos, setTodos] = useState([]);
    const token = localStorage.getItem('token');

    const navigate = useNavigate()

    if(!token) {
        navigate("/login")
    }

    useEffect(() => {
        if (!token) {
           navigate("/login");
        }
        else {
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
    })
  return (
     <div>
        {todos.length ? (
           <table>
              <tbody style={{ fontSize: "1.6rem" }}>
                 <tr>
                    <th style={{ maxWidth: "600px", minWidth: "300px" }}>
                       TODO
                    </th>
                    <th style={{ minWidth: "400px" }}>STATUS</th>
                    <th style={{ minWidth: "200px" }}>Deadline</th>
                    <th style={{ minWidth: "200px" }}>Priority</th>
                 </tr>
                 {todos &&
                    todos.map((todo, index) => (
                             <tr key={index}>
                                <td>{todo.task}</td>
                                <td className="interactive-td">
                                   {todo.isCompleted
                                      ? "Complete"
                                      : "Incomplete"}
                                </td>
                                <td className="interactive-td">
                                   {todo.deadline}
                                </td>
                                <td className="interactive-td">
                                   {todo.priority}
                                </td>
                             </tr>
                          ))}
              </tbody>
           </table>
        ) : (
           <p style={{ fontSize: "2rem", fontWeight: 600, margin: "1rem" }}>
              No Todos Added!
           </p>
        )}
     </div>
  );
}

export default AllTodos