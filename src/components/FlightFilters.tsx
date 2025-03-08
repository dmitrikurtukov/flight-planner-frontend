import { useEffect, useState } from "react";

interface FlightFilters {
  destination?: string;
  departureDate?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  sortBy?: "price_asc" | "price_desc" | "time_asc" | "time_desc";
}

interface FlightFiltersProps {
  onFilterChange: (filters: FlightFilters) => void;
}

function FlightFilters({ onFilterChange }: Readonly<FlightFiltersProps>) {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minDuration, setMinDuration] = useState(30);
  const [maxDuration, setMaxDuration] = useState(300);
  const [sortBy, setSortBy] = useState<FlightFilters["sortBy"]>();

  useEffect(() => {
    const filters: FlightFilters = {};
    if (destination) filters.destination = destination;
    if (departureDate) filters.departureDate = departureDate;
    if (minPrice > 0) filters.minPrice = minPrice;
    if (maxPrice < 500) filters.maxPrice = maxPrice;
    if (minDuration > 30) filters.minDuration = minDuration;
    if (maxDuration < 300) filters.maxDuration = maxDuration;
    if (sortBy) filters.sortBy = sortBy;

    onFilterChange(filters);
  }, [
    destination,
    departureDate,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    onFilterChange,
    sortBy,
  ]);

  return (
    <div className="row my-4">
      <div className="col-md-3">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          className="form-control"
          placeholder="E.g. Tokyo"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="col-md-2">
        <label htmlFor="departureDate">Departure Date</label>
        <div className="input-group">
          <input
            type="date"
            className="form-control"
            value={departureDate || ""}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {departureDate && (
            <button
              onClick={() => setDepartureDate("")}
              className="btn btn-light border"
              type="button"
              aria-label="Clear"
            >
              <span className="btn-close" aria-hidden="true"></span>
            </button>
          )}
        </div>
      </div>

      <div className="col-md-2">
        <label className="form-label">
          Price (€): {minPrice} - {maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={minPrice}
          className="form-range"
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          className="form-range"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">
          Duration (min): {minDuration} - {maxDuration}
        </label>
        <input
          type="range"
          min="30"
          max="300"
          value={minDuration}
          className="form-range"
          onChange={(e) => setMinDuration(Number(e.target.value))}
        />
        <input
          type="range"
          min="30"
          max="300"
          value={maxDuration}
          className="form-range"
          onChange={(e) => setMaxDuration(Number(e.target.value))}
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">
          Sort By{" "}
          <select
            className="form-select"
            value={sortBy ?? ""}
            onChange={(e) =>
              setSortBy(e.target.value as FlightFilters["sortBy"])
            }
          >
            <option value="">None</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="time_asc">Departure: Earliest First</option>
            <option value="time_desc">Departure: Latest First</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default FlightFilters;
