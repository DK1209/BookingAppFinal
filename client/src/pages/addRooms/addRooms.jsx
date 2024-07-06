import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./addRooms.css";

const AddRooms = () => {
    const location = useLocation();
  const hotelId = new URLSearchParams(location.search).get("hotelId");
    const { user } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        title:undefined,
        price:undefined,
        maxPeople:undefined,
        desc:undefined,
        roomNumbers:[]
    });

    const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
        const { id, value } = e.target;
      
        // If the input field is for roomNumbers, parse the input string
        // and create an array of objects
        if (id === "roomNumbers") {
          const roomNumbersArray = value.split(",").map((roomNumber) => ({
            number: parseInt(roomNumber.trim()), // Parse room number to integer
            unavailableDates: [] // Initialize unavailable dates as empty array
          }));
      
          setCredentials((prev) => ({ ...prev, roomNumbers: roomNumbersArray }));
        } else {
          // For other input fields, update state as usual
          setCredentials((prev) => ({ ...prev, [id]: value }));
        }
      };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`/api/rooms/${hotelId}`, credentials);
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
            <p>Add room details:</p>
              <div className="flex box">
                <input
                  type="text"
                  placeholder="title"
                  id="title"
                  onChange={handleChange}
                  className="lInput"
                  required={true}
                />
                <input
                  type="number"
                  placeholder="price"
                  id="price"
                  onChange={handleChange}
                  className="lInput"
                  required={true}
                />
              </div>
          

          <div className="flex box">
          <input
            type="number"
            placeholder="maxPeople"
            id="maxPeople"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          <input
            type="text"
            placeholder="description"
            id="desc"
            onChange={handleChange}
            className="lInput"
            required={true}
          />
          </div>


          <input
            type="text"
            placeholder="Enter room number separated by commas"
            id="roomNumbers"
            onChange={handleChange}
            className="lInput"
            required={true}
          />

          <button disabled={loading} onClick={handleClick} className="lButton">
            Submit
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    )
  };
  
  export default AddRooms;