import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page page-narrow">
      <h1>404 - Page Not Found</h1>
      <p className="muted-text">The page you requested does not exist.</p>
      <Link className="btn btn-secondary" to="/">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
