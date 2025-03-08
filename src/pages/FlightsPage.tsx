import { useEffect, useState } from "react";
import flightService, { Flight } from "../services/flight-service.ts";
import FlightFilters from "../components/FlightFilters.tsx";
import { useNavigate } from "react-router-dom";
import { CanceledError } from "../services/api-client.ts";

function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FlightFilters>({});
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    flightService
      .getFlights(filters, controller.signal)
      .then((flights) => setFlights(flights))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError("Failed to load the flights.");
      });

    return () => controller.abort();
  }, [filters]);

  return (
    <div className="container text-center my-5">
      <h2 className="animate__animated animate__fadeInDown">
        Available Flights
      </h2>
      <FlightFilters onFilterChange={setFilters} />
      {error ? (
        <div className="alert alert-danger mt-4">{error}</div>
      ) : (
        <table className="table table-bordered table-striped border-secondary-subtle mt-4 align-middle animate__animated animate__fadeInUp">
          <thead>
            <tr>
              <th scope="col">Flight nr</th>
              <th scope="col">Destination</th>
              <th scope="col">Departure Date</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr className="text-center" key={flight.id}>
                <td scope="row">{index + 1}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime.replace("T", " | ")}</td>
                <td>{flight.duration}</td>
                <td>{flight.price.toFixed(2)}€</td>
                <td>
                  <button
                    onClick={() => navigate(`/seats/${flight.id}`)}
                    className="btn btn-primary animate__animated animate__pulse"
                  >
                    Select Seats
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FlightsPage;
