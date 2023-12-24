import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import E404 from "./E404.tsx";
import Login from "./routes/login.tsx";
import Loans from "./routes/Loans.tsx";
import Records from "./routes/Records.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <E404 />,
    children: [
      {
        path: "",
        element: <Records />,
      },
      {
        path: "/loans",
        element: <Loans />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
