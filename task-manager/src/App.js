import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <TaskProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TaskProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
