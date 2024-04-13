import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import SignIn from "./pages/signIn/signIn";
import DeList from "./pages/deList/deList";
import ListProperty from "./pages/listProperty/listPropery";
import AddRooms from "./pages/addRooms/addRooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/listProperty" element={<ListProperty/>}/>
        <Route path="/deList" element={<DeList/>}/>
        <Route path="/addRooms" element={<AddRooms/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
