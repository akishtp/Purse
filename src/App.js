import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Records from "./Pages/Records/Records";
import Layout from "./Layout";
import Auth from "./Pages/Auth/Auth";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="*" element={<span>$404 Error</span>} />
          </Route>
          <Route path="auth" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<span>$404 Error</span>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
