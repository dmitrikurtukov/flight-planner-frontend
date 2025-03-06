import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-secondary mt-3">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
