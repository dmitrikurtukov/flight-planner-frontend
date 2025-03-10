# Flight Planner Frontend

This is the frontend application for the **Flight Planner** project. It provides a user-friendly interface for searching
flights, applying filters, and receiving seat recommendations based on user preferences.  
Users can select a flight, view available seats, and apply filters such as window seat preference, extra legroom,
proximity to exits, and keeping seats together when traveling in a group.  
The frontend interacts with the backend via REST API and dynamically updates seat recommendations based on user input.

---

## **Tech Stack**

- **React (TypeScript)**
- **Vite** (for fast development and build process)
- **Bootstrap** (for UI styling)
- **React Router** (for navigation)
- **Axios** (for API requests)
- **Docker** (for containerized deployment)

---

## **How to Run the Application**

Make sure you have **Node.js 20+** and **Docker Desktop** installed.

1. **Clone the repository** into WebStorm or similar IDE.
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Run the frontend application locally:**
    ```sh
    npm run dev
    ```
   The application should now be running at:  
   **http://localhost:5173**

4. **(Optional) Run the frontend in a Docker container:**
    ```sh
    docker-compose up -d --build
    ```

---

## **Development Process**

### **Time Spent on the Project (Frontend Part):** 20+ hours

### **Challenges and How They Were Solved**

- **API Integration Issues:** Initially, API requests were not working due to CORS restrictions. This was fixed by
  configuring CORS in the backend.
- **Seat Map Layout:** Displaying seats in a structured way with a clear layout was challenging. I tested different
  approaches and settled on a grid-based system inspired by existing transportation seat maps.
- **State Management for Filters:** Initially considered using a custom hook (`useSeatFilters`) but later opted for
  `useState`, because things weren't working properly.
- **Highlighting Recommended Seats:** Instead of hiding non-matching seats, I decided to keep them visible and highlight
  the recommended ones for a better user experience.

---

## **Notes**

- The frontend expects the backend to be running at **http://localhost:8080**.
- The UI is optimized for **desktop-first** experience.
