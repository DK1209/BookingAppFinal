import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./listProperty.css";

const ListProperty = () => {
    const { user } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        name:undefined,
        type:undefined,
        city:undefined,
        address:undefined,
        distance:undefined,
        title:undefined,
        desc:undefined,
        cheapestPrice:undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/hotels/", credentials);
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    };

    if (!user) navigate("/Login");
  
    return (
          <div className="login one">
            <div className="lContainer">
            <h1>List any property on Booking.com</h1>
            <p>Property details:</p>
              <div className="flex box">
                <input
                  type="text"
                  placeholder="name"
                  id="name"
                  onChange={handleChange}
                  className="lInput"
                  required={true}
                />
                <input
                  type="text"
                  placeholder="type"
                  id="type"
                  onChange={handleChange}
                  className="lInput"
                  required={true}
                />
              </div>
          
          <div className="flex box">
          <input
            type="text"
            placeholder="city"
            id="city"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          <input
            type="text"
            placeholder="address"
            id="address"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          </div>

          <div className="flex box">
          <input
            type="text"
            placeholder="distance"
            id="distance"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          <input
            type="text"
            placeholder="title"
            id="title"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          </div>

          <div className="flex box">
          <input
            type="text"
            placeholder="description"
            id="desc"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          <input
            type="text"
            placeholder="cheapestPrice"
            id="cheapestPrice"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          </div>

          <div className="flex box">
          <input
            type="number"
            placeholder="rating"
            id="rating"
            onChange={handleChange}
            className="lInput" 
          />
          <input
            type="Boolean"
            placeholder="featured"
            id="featured"
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
  
  export default ListProperty;