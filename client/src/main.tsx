import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import E404 from "./E404.tsx";
import Login from "./routes/Login.tsx";
import Loans from "./routes/Loans.tsx";
import Records from "./routes/Records.tsx";
import Overview from "./routes/Overview.tsx";
import Signup from "./routes/Signup.tsx";

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
      {
        path: "/overview",
        element: <Overview />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
