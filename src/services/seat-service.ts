import apiClient from "./api-client.ts";
import SeatFilters from "../components/SeatFilters.tsx";

export interface Seat {
  seatNumber: string;
  seatClass: "First Class" | "Business" | "Economy";
  reserved: boolean;
}

class SeatService {
  public async getRecommendedSeatsByFlight(
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

  public async getAllSeats(flightId: number, signal?: AbortSignal) {
    const response = await apiClient.get<Seat[]>(
      `/seats/all?flightId=${flightId}`,
      { signal },
    );
    return response.data;
  }
}

export default new SeatService();
