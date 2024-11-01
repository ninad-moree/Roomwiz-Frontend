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
import CheckOut from "./components/bookings/CheckOut.jsx";
import BookingSuccess from "./components/bookings/BookingSuccess.jsx";
import Bookings from "./components/bookings/Bookings.jsx";
import FindBooking from "./components/bookings/FindBooking.jsx";
import Login from "./components/auth/Login.jsx";
import Registration from "./components/auth/Registration.jsx";
import Profile from "./components/auth/Profile.jsx";
import Logout from "./components/auth/Logout.jsx";
import AuthProvider from "./components/auth/AuthProvider.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";

function App() {
  return (
    <AuthProvider>
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

            <Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<CheckOut />
								</RequireAuth>
							}
						/>

            {/* <Route path="/book-room/:roomId" element={<CheckOut />}/> */}
            <Route path="/booking-success" element={<BookingSuccess />}/>
            <Route path="/existing-bookings" element={<Bookings />}/>
            <Route path="/find-booking" element={<FindBooking />}/>

            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Registration />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/logout" element={<Logout />}/>
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App
