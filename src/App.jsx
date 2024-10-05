import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Home from "./components/home/Home.jsx"
import Footer from "./components/layout/Footer.jsx"
import NavBar from "./components/layout/NavBar.jsx"
import AddRoom from './components/room/AddRoom'
import EditRoom from "./components/room/EditRoom.jsx"
import ExistingRooms from "./components/room/ExistingRooms.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomListing from "./components/room/RoomListing.jsx"

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
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )
}

export default App
