import apiClient from "./api-client.ts";
import SeatFilters from "../components/SeatFilters.tsx";

export interface Seat {
  seatNumber: string;
  seatClass: "First Class" | "Business" | "Economy";
  reserved: boolean;
}

class SeatService {
  public async getSeatsByFlight(
    flightId: number,
    params?: SeatFilters,
    signal?: AbortSignal,
  ) {
    const response = await apiClient.get<Seat[]>(
      `/seats?flightId=${flightId}`,
      { params, signal },
    );
    return response.data;
  }
}

export default new SeatService();
