import { useCallback, useMemo, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import SearchBar from "../components/SearchBar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ConfirmDialog from "../components/ConfirmDialog";

function Home() {
  const { tasks, searchTerm, filter, dispatch } = useTaskContext();
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleSearchChange = useCallback(
    (value) => {
      dispatch({ type: "SET_SEARCH", payload: value });
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (value) => {
      dispatch({ type: "SET_FILTER", payload: value });
    },
    [dispatch]
  );

  const handleMoveTask = useCallback(
    (id, status) => {
      dispatch({ type: "MOVE_TASK", payload: { id, status } });
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      setDeleteTaskId(id);
    },
    []
  );

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const handleUpdateTask = useCallback(
    (formData) => {
      if (!editingTask) return;

      const updatedTask = {
        ...editingTask,
        title: formData.title,
        description: formData.description,
      };
      
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      setEditingTask(null);
    },
    [dispatch, editingTask]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTaskId) return;
    dispatch({ type: "DELETE_TASK", payload: deleteTaskId });
    setDeleteTaskId(null);
  }, [deleteTaskId, dispatch]);

  const handleCancelDelete = useCallback(() => {
    setDeleteTaskId(null);
  }, []);

  const filteredTasks = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(lowerSearch);
      const matchesFilter = filter === "all" || task.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filter]);

  const { todoTasks, inProgressTasks, doneTasks } = useMemo(() => {
    return {
      todoTasks: filteredTasks.filter((task) => task.status === "todo"),
      inProgressTasks: filteredTasks.filter((task) => task.status === "in-progress"),
      doneTasks: filteredTasks.filter((task) => task.status === "done"),
    };
  }, [filteredTasks]);

  return (
    <main className="page">
      <h1>Task Board</h1>
      <p className="muted-text">Visible tasks: {filteredTasks.length}</p>

      <SearchBar
        searchTerm={searchTerm}
        filter={filter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {editingTask && (
        <section className="panel">
          <h2>Edit Task</h2>
          <TaskForm
            onSubmit={handleUpdateTask}
            initialValues={editingTask}
            submitLabel="Save Changes"
          />
          <button className="btn btn-secondary" onClick={handleCancelEdit}>
            Cancel
          </button>
        </section>
      )}

      <div className="board-grid">
        <section className="column">
          <h2>To Do</h2>
          {todoTasks.length === 0 ? (
            <p className="empty-state">No tasks yet</p>
          ) : (
            todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </section>

        <section className="column">
          <h2>In Progress</h2>
          {inProgressTasks.length === 0 ? (
            <p className="empty-state">No tasks yet</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </section>

        <section className="column">
          <h2>Done</h2>
          {doneTasks.length === 0 ? (
            <p className="empty-state">No tasks yet</p>
          ) : (
            doneTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTaskId)}
        title="Delete task"
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}

export default Home;
