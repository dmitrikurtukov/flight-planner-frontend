import apiClient from "./api-client.ts";

export interface Flight {
  id: number;
  destination: string;
  departureTime: string;
  price: number;
  duration: number;
}

class FlightService {
  public async getAll(signal?: AbortSignal) {
    const response = await apiClient.get<Flight[]>("/flights", { signal });
    return response.data;
  }
}

export default new FlightService();
