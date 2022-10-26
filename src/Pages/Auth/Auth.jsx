import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logimg from "../../Sky.jpg";
import "./Auth.css";

const Auth = () => {
  const { userDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails != null) {
      navigate("/");
    }
  }, [navigate, userDetails]);
  return (
    <div className="login">
      <div className="auth-wrapper">
        <div className="form-side">
          <nav className="auth-navigation">
            <Link to="login" className="auth-nav">
              Login
            </Link>
            <Link to="signup" className="auth-nav">
              Signup
            </Link>
          </nav>
          <Outlet />
        </div>
        <div className="image-wrapper">
          <img src={logimg} className="logimg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
