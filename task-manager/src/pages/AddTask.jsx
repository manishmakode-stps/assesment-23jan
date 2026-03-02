import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

function AddTask() {
  const { dispatch } = useTaskContext();
  const navigate = useNavigate();

  const handleAddTask = (formData) => {
    const id = crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    const newTask = {
      id,
      title: formData.title,
      description: formData.description,
      status: "todo",
      createdAt: Date.now(),
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
    navigate("/");
  };

  return (
    <main className="page page-narrow">
      <h1>Add Task</h1>
      <p className="muted-text">Create a new task. It will be added to the To Do column.</p>
      <TaskForm onSubmit={handleAddTask} submitLabel="Create Task" />
    </main>
  );
}

export default AddTask;
