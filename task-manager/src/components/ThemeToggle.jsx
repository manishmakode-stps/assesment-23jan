import { useThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, dispatch } = useThemeContext();

  const label = theme === "light" ? "Switch to Dark" : "Switch to Light";

  return (
    <button className="btn btn-theme" onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
      {label}
    </button>
  );
}

export default ThemeToggle;
