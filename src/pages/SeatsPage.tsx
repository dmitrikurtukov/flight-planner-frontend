import { Link, useParams } from "react-router-dom";
import seatService, { Seat } from "../services/seat-service.ts";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import SeatFilters from "../components/SeatFilters.tsx";
import SeatMap from "../components/SeatMap/SeatMap.tsx";
import SeatLegend from "../components/SeatLegend/SeatLegend.tsx";

function SeatsPage() {
  const { flightId } = useParams();
  const [allSeats, setAllSeats] = useState<Seat[]>([]);
  const [recommendedSeats, setRecommendedSeats] = useState<Seat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SeatFilters>({});

  useEffect(() => {
    if (!flightId) return;
    const controller = new AbortController();
    seatService
      .getAllSeats(Number(flightId), controller.signal)
      .then((seats) => {
        setAllSeats(seats);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError("Failed to load all allSeats.");
      });
    return () => controller.abort();
  }, [flightId]);

  useEffect(() => {
    if (!flightId) return;
    const controller = new AbortController();
    seatService
      .getRecommendedSeatsByFlight(Number(flightId), filters, controller.signal)
      .then((seats) => setRecommendedSeats(seats))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError("Failed to load recommended allSeats.");
      });
    return () => controller.abort();
  }, [flightId, filters]);

  if (error) return <div className="alert alert-danger my-5">{error}</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-3 animate__animated animate__fadeInLeft">
          <SeatFilters onFilterChange={setFilters} />
        </div>
        <div className="col-md-3 text-center shadow-sm card p-3 align-items-center animate__animated animate__fadeInUp">
          <SeatMap allSeats={allSeats} recommendedSeats={recommendedSeats} />
        </div>
        <div className="col-md-3 animate__animated animate__fadeInRight">
          <SeatLegend />
          <div className="d-flex justify-content-center">
            <Link to="/flights" className="btn btn-primary mt-3">
              Go back to Flights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatsPage;
