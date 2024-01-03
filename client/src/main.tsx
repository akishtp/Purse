import store from "./app/store.ts";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import E404 from "./E404.tsx";
import Login from "./routes/Login.tsx";
import Records from "./routes/Records.tsx";
import Overview from "./routes/Overview.tsx";
import Schedule from "./routes/Schedule.tsx";
import { Provider } from "react-redux";

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
        path: "/schedule",
        element: <Schedule />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
