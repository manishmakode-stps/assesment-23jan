import { memo } from "react";
import { Link } from "react-router-dom";

function TaskCard({ task, onMove, onDelete, onEdit }) {
  const nextStatusMap = {
    todo: "in-progress",
    "in-progress": "done",
    done: "todo",
  };

  const labelMap = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  const nextStatus = nextStatusMap[task.status];

  return (
    <article className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description || "No description provided."}</p>
      <p>
        Status: <strong>{labelMap[task.status]}</strong>
      </p>
      <div className="task-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-primary" onClick={() => onMove(task.id, nextStatus)}>
          Move
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
        <Link className="btn btn-secondary" to={`/tasks/${task.id}`}>
          View
        </Link>
      </div>
    </article>
  );
}

export default memo(TaskCard);
