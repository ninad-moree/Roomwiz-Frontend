import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Home from "./components/home/Home.jsx"
import Footer from "./components/layout/Footer.jsx"
import NavBar from "./components/layout/NavBar.jsx"
import AddRoom from './components/room/AddRoom'
import EditRoom from "./components/room/EditRoom.jsx"
import ExistingRooms from "./components/room/ExistingRooms.jsx"
import RoomListing from "./components/room/RoomListing.jsx"
import Admin from "./components/admin/Admin.jsx";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/edit-room/:roomId" element={<EditRoom />}/>
            <Route path="/existing-rooms" element={<ExistingRooms />}/>
            <Route path="/add-room" element={<AddRoom />}/>
            <Route path="/browse-all-rooms" element={<RoomListing />}/>
            <Route path="/admin" element={<Admin />}/>
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )
}

export default App
