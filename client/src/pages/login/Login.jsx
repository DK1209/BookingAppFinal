import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      console.log(res.data.details);
      console.log(res.data.details._id);
      if (res.data.details && res.data.details._id) { // Check if user details and user ID exist
        dispatch({ 
          type: "LOGIN_SUCCESS", 
          payload: {
            user: res.data.details,
            userId: res.data.details._id
          } 
        });
        navigate("/");
      } else {
        // Handle case where user details or user ID are missing
        dispatch({ type: "LOGIN_FAILURE", payload: "User details or user ID missing" });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
      <h2>Log in to your account</h2>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
          required={true}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
          required={true}
        />
        <button disabled={loading} onClick={handleClick} className="lb">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
