import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./signIn.css";

const SignIn = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        email:undefined,
        password:undefined,
        city:undefined,
        country:undefined,
        phone:undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/api/users/", credentials);
        navigate("/")
      } catch (err) {
        console.log(err.response.data);
      }
    };

return (
    <div className="login one">
      <div className="lContainer">
      <h2>Enter your details</h2>
        <div className="flex box">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
        </div>
    
    <div className="flex box">
    <input
      type="text"
      placeholder="password"
      id="password"
      onChange={handleChange}
      className="lInput"
      required={true}
    />
    <input
      type="text"
      placeholder="city"
      id="city"
      onChange={handleChange}
      className="lInput"
    />
    </div>

    <div className="flex box">
    <input
      type="text"
      placeholder="country"
      id="country"
      onChange={handleChange}
      className="lInput"
    />
    <input
      type="text"
      placeholder="phone"
      id="phone"
      onChange={handleChange}
      className="lInput"
    />
    </div>
    <button disabled={loading} onClick={handleClick} className="lButton">
      Submit
    </button>
    {error && <span>{error.message}</span>}
  </div>
</div>
)
};

export default SignIn;