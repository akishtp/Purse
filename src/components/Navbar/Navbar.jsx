import { logout } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { userDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <nav className="nav">
      <div className="left-side">
        <Link to="/">Purse</Link>
      </div>
      <div className="right-side" onClick={() => handleLogout()}>
        {userDetails.name}
      </div>
    </nav>
  );
};

export default Navbar;
