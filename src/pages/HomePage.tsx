import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center text-center my-5">
      <h1 className="fw-bold animate__animated animate__fadeInDown">
        Welcome to Flight Planner!
      </h1>
      <p className="lead animate__animated animate__fadeInUp">
        Easily plan and manage your flights. Find the best seats and get
        recommendations based on your preferences.
      </p>
      <Link
        to="/flights"
        className="btn btn-primary mt-3 animate__animated animate__pulse"
      >
        View Flights
      </Link>
      <div className="mt-4">
        <img
          src="/images/airplane.jpg"
          alt="Airplane"
          className="img-fluid img-size rounded-circle animate__animated animate__zoomIn"
          style={{ width: 450 }}
        />
      </div>
    </div>
  );
}

export default HomePage;
