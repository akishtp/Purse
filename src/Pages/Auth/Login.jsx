import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user/userActions";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name, password }));
  };

  return (
    <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-header">Welcome Back 🙏</div>
      {error && <div className="error">{error}</div>}
      <label className="auth-label">
        Name :
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="auth-label">
        Password :
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="auth-button" disabled={loading} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
