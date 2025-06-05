// reducers
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [{id:"abc", task:"demo-task", completed:false, priority: "medium", createdAt: new Date().toISOString()}],
  filter: "all" // "all", "active", "completed"
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // Check if payload is an object or string
            if (typeof action.payload === 'object') {
                // Object payload from form
                if (!action.payload.task || action.payload.task.trim() === '') return;
                
                const newTodo = {
                    id: nanoid(),
                    task: action.payload.task.trim(),
                    completed: false,
                    priority: action.payload.priority || "medium",
                    createdAt: new Date().toISOString()
                }
                state.todos.push(newTodo);
            } else {
                // String payload (for backward compatibility)
                if (!action.payload || action.payload.trim() === '') return;
                
                const newTodo = {
                    id: nanoid(),
                    task: action.payload.trim(),
                    completed: false,
                    priority: "medium",
                    createdAt: new Date().toISOString()
                }
                state.todos.push(newTodo);
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        markAsDone: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setPriority: (state, action) => {
            const { id, priority } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.priority = priority;
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        editTodo: (state, action) => {
            const { id, task } = action.payload;
            if (!task || task.trim() === '') return;
            
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.task = task.trim();
                todo.updatedAt = new Date().toISOString();
            }
        }
    },
})

export const { 
    addTodo, 
    deleteTodo, 
    markAsDone, 
    setPriority, 
    setFilter,
    clearCompleted,
    editTodo
} = todoSlice.actions;

export default todoSlice.reducer;
