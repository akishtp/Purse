import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="left-side">
        <Link to="/">Home</Link>
        <Link to="/records">Records</Link>
      </div>
      <div className="right-side">User</div>
    </nav>
  );
};

export default Navbar;
