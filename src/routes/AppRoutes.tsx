import { createBrowserRouter } from "react-router-dom";
import { CustomRouteObject } from "../types/Types"; 
import Home from "../pages/Home";
import Planning from "../pages/Planning";
import SKUs from "../pages/SKUs";
import ChartPage from "../pages/Chart";

// Define routes with proper typing
const routes: CustomRouteObject[] = [
  {
    path: "/",
     element: <Home />, 
    name: "Home",
  },
  {
    path: "/planning",
     element: <Planning />, 
    name: "Planning",
  },
  {
    path: "/skus",
     element: <SKUs />, 
    name: "SKUs",
  },
  {
    path: "/chart",
     element: <ChartPage />, 
    name: "Chart",
  },
];

export const AppRoutes = createBrowserRouter(routes);