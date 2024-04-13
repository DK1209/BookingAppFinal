import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import  axios  from "axios";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call the logout API endpoint to clear the access token
      await axios.post("/auth/logout");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Optionally, perform any additional cleanup or state updates
      // Redirect the user to the login page or any other appropriate page
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user ? (
  <div className="navItems">
  <button className="navButton" onClick={() => navigate(`/listProperty`)}>
  <span className="desktopText">List your property</span>
  <span className="mobileText">List</span>
  </button>
  <button className="navButton" onClick={() => navigate(`/deList`)}>
  <span className="desktopText">Delist your property</span>
  <span className="mobileText">Delist</span>
  </button>
    <button className="navButton" onClick={handleLogout}>Logout</button>
  </div>
) : (
  <div className="navItems">
    <button className="navButton" onClick={() => navigate("/login")}>Login</button>
  </div>
)}    
      </div>
    </div>
  );
};

export default Navbar;
