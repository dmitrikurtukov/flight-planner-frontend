import { Seat } from "../../services/seat-service.ts";
import "./SeatMap.css";

interface SeatMapProps {
  allSeats: Seat[];
  recommendedSeats: Seat[];
  flightId: number;
}

function SeatMap({
  allSeats,
  recommendedSeats,
  flightId,
}: Readonly<SeatMapProps>) {
  const seatsByRow: Record<string, Seat[]> = allSeats.reduce(
    (acc, seat) => {
      const rowNumber = seat.seatNumber.replace(/\D/g, "");
      if (!acc[rowNumber]) acc[rowNumber] = [];
      acc[rowNumber].push(seat);
      return acc;
    },
    {} as Record<string, Seat[]>,
  );

  const getSeatClass = (seat: Seat) => {
    let seatClass = "seat-box";

    switch (seat.seatClass) {
      case "Economy":
        seatClass += " economy";
        break;
      case "Business":
        seatClass += " business";
        break;
      case "First Class":
        seatClass += " first-class";
        break;
    }

    if (seat.reserved) {
      seatClass += " reserved";
    } else if (recommendedSeats.some((s) => s.seatNumber === seat.seatNumber)) {
      seatClass += " recommended";
    }

    return seatClass;
  };

  return (
    <div>
      <h3>{flightId}. Flight Seats</h3>
      <div className="d-flex flex-column gap-2 mt-4">
        {Object.entries(seatsByRow).map(([row, seats]) => (
          <div
            key={row}
            className={
              "d-flex align-items-center" + (row === "10" ? " mb-2" : "")
            }
          >
            {seats.map((seat, index) => (
              <div
                key={seat.seatNumber}
                className={
                  getSeatClass(seat) + (index === 2 ? " me-4" : " me-2")
                }
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatMap;
