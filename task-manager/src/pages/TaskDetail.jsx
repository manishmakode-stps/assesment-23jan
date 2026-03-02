import { Link, useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useTaskContext();

  const task = tasks.find((t) => t.id === id);
  const labelMap = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  if (!task) {
    return (
      <main className="page page-narrow">
        <h1>Task Not Found</h1>
        <p className="muted-text">No task exists for id: {id}</p>
        <Link className="btn btn-secondary" to="/">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="page page-narrow">
      <h1>Task Detail</h1>
      <section className="panel">
        <h2>{task.title}</h2>
        <p>{task.description || "No description provided."}</p>
        <p>
          Status: <strong>{labelMap[task.status]}</strong>
        </p>
        <p className="muted-text">
          Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "Unknown"}
        </p>
        <Link className="btn btn-secondary" to="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default TaskDetail;
