import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./deList.css";

const DeList = () => {
    const { user,userId } = useContext(AuthContext);
   const [credentials, setCredentials] = useState({
        name:undefined,
        address:undefined,
    }); 

    const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      if (id==="city"){
        const lower_val=value.toLowerCase();
        setCredentials((prev) => ({ ...prev, [e.target.id]: lower_val }));  
      }
      else{
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      }
    };
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const response=await axios.get("/api/hotels/id", {params:{ name: credentials.name, address:credentials.address }});
        if (response.data.hotelId){
        const res = await axios.delete(`/api/hotels/${response.data.hotelId}/${userId}`, {data:credentials});
        navigate("/");
        } else console.log("hotel id is null");
      } catch (err) {
        console.log(err);
      }
    };

    if (!user) navigate("/Login");
  
    return (
          <div className="login one">
            <div className="lContainer">
            <h1>Remove your property from Booking.com</h1>
            <p>Property details:</p>
              <div className="box">
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
                  placeholder="address"
                  id="address"
                  onChange={handleChange}
                  className="lInput"
                  required={true}
                />
              </div>
          
          <button disabled={loading} onClick={handleClick} className="lButton">
            Delete hotel
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    )
  };
  
  export default DeList;