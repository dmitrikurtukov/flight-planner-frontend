import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="animate__animated animate__tada">404 - Page Not Found</h1>
      <p className="animate__animated animate__fadeIn">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="btn btn-secondary mt-3 animate__animated animate__pulse"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
