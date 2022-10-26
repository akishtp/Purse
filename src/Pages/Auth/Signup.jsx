import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/user/userActions";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name, password, email }));
  };
  return (
    <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-header">Hello there 👋</div>
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
      <label className="auth-label">
        Email :
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="auth-button" disabled={loading} type="submit">
        Signup
      </button>
      {error && <span>{error}</span>}
    </form>
  );
};

export default Signup;
