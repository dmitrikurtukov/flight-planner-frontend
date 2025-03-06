import FlightsPage from "./pages/FlightsPage.tsx";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "flights", element: <FlightsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
