import { logout } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ setDropdown }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div className="backdrop" onClick={() => setDropdown(false)}>
      <ul className="dropdown-items">
        <li className="dropdown-item">An item</li>
        <li className="dropdown-item">Another item</li>
        <li className="dropdown-item">second last Item</li>
        <li className="dropdown-item" onClick={() => handleLogout()}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
