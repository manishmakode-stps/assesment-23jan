import { createContext,useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

const initialState = {
    tasks:[],
    searchTerm:"",
    filter:"all"
}

function taskReducer(state, action){
    switch(action.type){

        case "INIT_TASKS":
            return {...state, tasks: action.payload};

        case "ADD_TASK":
            return {...state, tasks: [...state.tasks, action.payload]};

        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task.id === action.payload.id ? action.payload : task
                )
            };

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case "MOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task)=>
                    task.id === action.payload.id ? {...task, status: action.payload.status} : task 
                )
            }

        case "SET_SEARCH":
            return{ ...state, searchTerm: action.payload};

        case "SET_FILTER":
            return{ ...state, filter: action.payload};

        default:
            return state;
    }
}

export const TaskProvider = ({ children }) => {
  
    const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
    const [state, dispatch] = useReducer(taskReducer, {...initialState, tasks: storedTasks});


    useEffect(() => {
        setStoredTasks(state.tasks);
    },[state.tasks, setStoredTasks]);
 
  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}