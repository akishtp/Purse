import { logout } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <nav className="nav">
      <div className="left-side">
        <Link to="/">Home</Link>
        <Link to="/records">Records</Link>
      </div>
      <div className="right-side" onClick={() => handleLogout()}>
        User
      </div>
    </nav>
  );
};

export default Navbar;
