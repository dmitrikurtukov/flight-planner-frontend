import { useEffect, useState } from "react";
import flightService, { Flight } from "../services/flight-service.ts";
import { CanceledError } from "axios";
import FlightFilters from "../components/FlightFilters.tsx";

function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FlightFilters>({});

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
    <div className="container text-center mt-5">
      <h2>Available Flights</h2>
      <FlightFilters onFilterChange={setFilters} />
      {error ? (
        <div className="alert alert-danger mt-4">{error}</div>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Destination</th>
              <th scope="col">Departure Date</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td scope="row">{flight.id}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime.replace("T", " | ")}</td>
                <td>{flight.duration}</td>
                <td>{flight.price.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FlightsPage;
