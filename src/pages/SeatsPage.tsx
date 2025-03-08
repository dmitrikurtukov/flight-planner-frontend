import { useParams } from "react-router-dom";
import seatService, { Seat } from "../services/seat-service.ts";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import SeatFilters from "../components/SeatFilters.tsx";

function SeatsPage() {
  const { flightId } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SeatFilters>({});

  useEffect(() => {
    if (!flightId) return;

    const controller = new AbortController();

    seatService
      .getSeatsByFlight(Number(flightId), filters, controller.signal)
      .then((seats) => {
        setSeats(seats);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError("Failed to load seats.");
      });

    return () => controller.abort();
  }, [filters, flightId]);

  if (error) return <div className="alert alert-danger my-5">{error}</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <SeatFilters onFilterChange={setFilters} />
        </div>

        <div className="col-md-9 text-center">
          <h2>Available Seats: {seats.length}</h2>
        </div>
      </div>
    </div>
  );
}

export default SeatsPage;
