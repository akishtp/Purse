import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { userDetails } = useSelector((state) => state.user);

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <ul className="nav-left-side">
          <li>
            <Link to="/home">Purse</Link>
          </li>
          <li>
            <Link to="records">Records</Link>
          </li>
        </ul>
        <div className="nav-right-side">
          {userDetails ? (
            <span
              className="navbar-name"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              {userDetails.name}
            </span>
          ) : (
            <button className="auth-button">
              <Link to="/auth">Login</Link>
            </button>
          )}
          {dropdown && <Dropdown setDropdown={setDropdown} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
