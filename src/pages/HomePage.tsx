import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container d-flex flex-column align-items-center text-center mt-5">
      <h1 className="fw-bold">Welcome to Flight Planner!</h1>
      <p className="lead">
        Easily plan and manage your flights. Find the best seats and get
        recommendations based on your preferences.
      </p>
      <Link to="/flights" className="btn btn-primary mt-3">
        View Flights
      </Link>
      <div className="mt-4">
        <img
          src="/images/flight_planner.jpg"
          alt="Airplane"
          className="img-fluid img-size"
        />
      </div>
    </div>
  );
}

export default HomePage;
