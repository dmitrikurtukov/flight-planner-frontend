import { useEffect, useState } from "react";
import flightService, { Flight } from "../services/flight-service.ts";
import { CanceledError } from "axios";

function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    flightService
      .getAll(controller.signal)
      .then((flights) => setFlights(flights))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Available Flights</h1>
      {error && <p className="text-danger">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Destination</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Duration (in minutes)</th>
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
    </div>
  );
}

export default FlightsPage;
