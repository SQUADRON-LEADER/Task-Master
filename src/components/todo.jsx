import { useSelector } from "react-redux";  
import AddForm from "./AddForm";
import { useDispatch } from "react-redux";
import { deleteTodo, markAsDone } from "../features/todo/todoslice";
import { useState } from "react";

export default function Todo() {
    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all"); // "all", "active", "completed"
    
    const clickHandler = (id) => {
        dispatch(deleteTodo(id));
    }
    
    const toggleDoneHandler = (id) => {
        dispatch(markAsDone(id));
    }
    
    const filteredTodos = todos.filter(todo => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });
    
    const completedCount = todos.filter(todo => todo.completed).length;
    
    return (
      <div className="todo-container" style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "25px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: "#333"
      }}>
        <div style={{ marginBottom: "25px" }}>
          <AddForm />
        </div>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}>
          <div style={{ fontWeight: "500", fontSize: "14px" }}>
            <span>{todos.length} tasks • </span>
            <span style={{ color: "#4caf50" }}>{completedCount} completed</span>
          </div>
          
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              onClick={() => setFilter("all")}
              style={{
                backgroundColor: filter === "all" ? "#764ba2" : "#f0f0f0",
                color: filter === "all" ? "white" : "#555",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("active")}
              style={{
                backgroundColor: filter === "active" ? "#2196f3" : "#f0f0f0",
                color: filter === "active" ? "white" : "#555",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter("completed")}
              style={{
                backgroundColor: filter === "completed" ? "#4caf50" : "#f0f0f0",
                color: filter === "completed" ? "white" : "#555",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Completed
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: "#f9fafc",
          borderRadius: "8px",
          padding: "15px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
        }}>
          {filteredTodos && filteredTodos.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {filteredTodos.map((todo) => (
                <li key={todo.id} style={{
                  backgroundColor: todo.completed ? "#f0f7f0" : "white",
                  padding: "14px 16px",
                  borderRadius: "6px",
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: todo.completed ? "4px solid #4caf50" : "4px solid #2196f3",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  transform: "translateX(0)",
                  animation: "fadeIn 0.3s ease-in-out"
                }}>
                  <span style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#333",
                    fontSize: "16px",
                    flex: 1,
                    wordBreak: "break-word",
                    padding: "0 5px"
                  }}>{todo.task}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      onClick={() => toggleDoneHandler(todo.id)}
                      style={{
                        backgroundColor: todo.completed ? "#ff9800" : "#4caf50",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>
                    <button 
                      onClick={() => clickHandler(todo.id)}
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ 
              textAlign: "center", 
              padding: "30px 20px", 
              color: "#888",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#999"
              }}>
                📋
              </div>
              <div>
                <p style={{ margin: "0 0 8px 0", fontWeight: "500", fontSize: "16px" }}>
                  {filter === "all" ? "No tasks found" : 
                   filter === "active" ? "No active tasks" : 
                   "No completed tasks"}
                </p>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  {filter === "all" ? "Add a task to get started!" : 
                   filter === "active" ? "All tasks are completed. Great job!" : 
                   "Complete some tasks to see them here."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}