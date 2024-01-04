// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { Outlet, useNavigate } from "react-router-dom";
import AddRecord from "./components/AddRecord";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useAppSelector } from "./app/hooks";

function App() {
  const navigate = useNavigate();

  const { userDetails } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    }
  }, [userDetails]);

  return (
    <div className="flex">
      <Navbar />
      <div className="w-6/12 bg-neutral-900 my-2 mx-1 rounded-xl px-4 h-content">
        <Outlet />
      </div>
      <AddRecord />
    </div>
  );
}

export default App;
