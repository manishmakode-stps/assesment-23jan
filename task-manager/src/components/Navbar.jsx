import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header className="navbar">
      <h1>Task Manager</h1>
      <nav className="nav-links">
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/add">
          Add Task
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/about">
          About
        </NavLink>
      </nav>
      <ThemeToggle />
    </header>
  );
}

export default Navbar;
