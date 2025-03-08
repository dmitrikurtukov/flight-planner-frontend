import { useEffect, useState } from "react";

interface SeatFilters {
  passengerCount?: number;
  windowPreferred?: boolean;
  extraLegroom?: boolean;
  nearExit?: boolean;
  seatsTogether?: boolean;
  seatClass?: string;
}

interface SeatFiltersProps {
  onFilterChange: (filters: SeatFilters) => void;
}

function SeatFilters({ onFilterChange }: Readonly<SeatFiltersProps>) {
  const [passengerCount, setPassengerCount] = useState(1);
  const [windowPreferred, setWindowPreferred] = useState(false);
  const [extraLegroom, setExtraLegroom] = useState(false);
  const [nearExit, setNearExit] = useState(false);
  const [seatsTogether, setSeatsTogether] = useState(false);
  const [seatClass, setSeatClass] = useState("");

  useEffect(() => {
    const filters: SeatFilters = {};
    if (passengerCount > 1) filters.passengerCount = passengerCount;
    if (windowPreferred) filters.windowPreferred = windowPreferred;
    if (extraLegroom) filters.extraLegroom = extraLegroom;
    if (nearExit) filters.nearExit = nearExit;
    if (seatsTogether) filters.seatsTogether = seatsTogether;
    if (seatClass) filters.seatClass = seatClass;
    onFilterChange(filters);
  }, [
    passengerCount,
    windowPreferred,
    extraLegroom,
    nearExit,
    seatsTogether,
    seatClass,
    onFilterChange,
  ]);

  const handleSeatsTogetherChange = () => {
    setSeatsTogether((prev) => {
      const newSeatsTogether = !prev;
      if (newSeatsTogether) {
        setWindowPreferred(false);
        setExtraLegroom(false);
        setNearExit(false);
      }
      return newSeatsTogether;
    });
  };

  return (
    <div className="card p-3 shadow-sm">
      <h4>Filters</h4>

      <label className="form-label">
        Seat Class:{" "}
        <select
          className="form-select"
          value={seatClass}
          onChange={(e) => setSeatClass(e.target.value)}
        >
          <option value="">Any</option>
          <option value="First Class">First Class</option>
          <option value="Business">Business</option>
          <option value="Economy">Economy</option>
        </select>
      </label>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="windowPreferred"
          checked={windowPreferred}
          disabled={seatsTogether}
          onChange={() => setWindowPreferred((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="windowPreferred">
          Window Seat
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="extraLegroom"
          checked={extraLegroom}
          disabled={seatsTogether}
          onChange={() => setExtraLegroom((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="extraLegroom">
          Extra Legroom
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="nearExit"
          checked={nearExit}
          disabled={seatsTogether}
          onChange={() => setNearExit((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="nearExit">
          Near Exit
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="seatsTogether"
          checked={seatsTogether}
          onChange={handleSeatsTogetherChange}
        />
        <label className="form-check-label" htmlFor="seatsTogether">
          Seats Together
        </label>
      </div>

      <div className="mt-3">
        <label className="form-label">
          Passengers:{" "}
          <input
            type="number"
            className="form-control"
            min="1"
            max="3"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

export default SeatFilters;
