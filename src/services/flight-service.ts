import apiClient from "./api-client.ts";
import FlightFilters from "../components/FlightFilters.tsx";

export interface Flight {
  id: number;
  destination: string;
  departureTime: string;
  price: number;
  duration: number;
}

class FlightService {
  public async getFlights(
    params?: FlightFilters,
    signal?: AbortSignal,
  ): Promise<Flight[]> {
    const response = await apiClient.get<Flight[]>("/flights", {
      params,
      signal,
    });
    return response.data;
  }
}

export default new FlightService();
