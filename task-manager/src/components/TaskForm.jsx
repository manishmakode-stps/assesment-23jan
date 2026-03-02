import { useEffect, useState } from "react";

function TaskForm({ onSubmit, initialValues = null, submitLabel = "Add Task" }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialValues?.title || "");
    setDescription(initialValues?.description || "");
    setErrors({});
  }, [initialValues]);

  const validate = () => {
    const nextErrors = {};

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      nextErrors.title = "Title is required";
    } else if (trimmedTitle.length < 3 || trimmedTitle.length > 50) {
      nextErrors.title = "Title must be between 3 and 50 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    // Clear only for add mode
    if (!initialValues) {
      setTitle("");
      setDescription("");
      setErrors({});
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default TaskForm;
