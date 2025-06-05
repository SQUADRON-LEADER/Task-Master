import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoslice';

export default function AddForm() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTodo({ 
        task: task.trim(), 
        priority 
      }));
      setTask("");
      setIsExpanded(false);
    }
  };

  return(
    <div className="add-form-container glass-card">
      <form onSubmit={submitHandler} className="todo-form">
        <div className="input-container" onClick={() => setIsExpanded(true)}>
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            onFocus={() => setIsExpanded(true)}
          />
          {task.length > 0 && (
            <button 
              type="button"
              className="clear-input"
              onClick={(e) => {
                e.stopPropagation();
                setTask("");
              }}
            >
              ×
            </button>
          )}
        </div>
        
        {isExpanded && (
          <div className="form-options">
            <div className="priority-selector">
              <span className="option-label">Priority:</span>
              <div className="priority-buttons">
                <button 
                  type="button"
                  className={`priority-btn ${priority === "low" ? "selected" : ""}`}
                  onClick={() => setPriority("low")}
                >
                  <span className="priority-dot priority-low"></span>
                  Low
                </button>
                <button 
                  type="button"
                  className={`priority-btn ${priority === "medium" ? "selected" : ""}`}
                  onClick={() => setPriority("medium")}
                >
                  <span className="priority-dot priority-medium"></span>
                  Medium
                </button>
                <button 
                  type="button"
                  className={`priority-btn ${priority === "high" ? "selected" : ""}`}
                  onClick={() => setPriority("high")}
                >
                  <span className="priority-dot priority-high"></span>
                  High
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button 
          type="submit"
          className="todo-button"
          disabled={!task.trim()}
        >
          Add Task
        </button>
      </form>
      
      {isExpanded && (
        <div 
          className="form-backdrop"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </div>
  );
}