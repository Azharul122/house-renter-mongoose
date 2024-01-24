import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import OutletContainer from "./Components/Home/OutletContainer";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Owner from "./Components/Dashboard/Owner/Owner";
import { AuthContextProvider } from "./Components/Context/AuthContext";
import Renter from "./Components/Dashboard/Renter/Renter";
import AddHouse from "./Components/Dashboard/Owner/AddHouse";
import EditHouse from "./Components/Dashboard/Owner/EditHouse";
import DeleteHouse from "./Components/Dashboard/Owner/DeleteHouse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletContainer />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/ower-dashboard",
        element: <Owner />,
      },
      {
        path: "/ower-dashboard/add-house",
        element: <AddHouse></AddHouse>,
      },
      {
        path: "/ower-dashboard/edit-house/:id",
        element: <EditHouse></EditHouse>,
      },
     
      {
        path: "/delete-house",
        element: <DeleteHouse></DeleteHouse>,
      },

      {
        path: "/renter-dashboard",
        element: <Renter />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
