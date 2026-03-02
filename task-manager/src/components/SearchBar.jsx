function SearchBar({ searchTerm, filter, onSearchChange, onFilterChange }) {
  return (
    <div className="search-row">
      <input
        className="search-input"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select className="status-filter" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default SearchBar;
