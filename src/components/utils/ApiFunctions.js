import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192",
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* ###########################################  ROOM CRUD OPERATIONS  ########################################### */

// ADD NEW ROOM
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader()
    });

    if(response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// GET ALL ROOM TYPES
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types");
    }
}

// GET ALL ROOMS
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/get-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching room");
    }
}

// DELETE ROOM BY ID
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		});
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`);
    }
}

// EDIT ROOM BY ID
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put(`/rooms/edit/${roomId}`, formData, {
        headers: getHeader()
    });
    return response;
}

// GET SINGLE ROOM BY ID
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error getting room ${error.message}`);
    }
} 

// GET AVAILABLE ROOMS FOR DATES (NOT BOOKED)
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    return result;
}


/* ###########################################  BOOKING ROOM OPERATIONS  ########################################### */

// BOOK ROOM
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
			headers: getHeader()
		});
        return response.data;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(`Error: ${error.response.data}`);
        } else {
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}

// GET ALL BOOKINGS
export async function getAllBookings() {
    try {
        const result = await api.get(`/bookings/all-bookings`, {
			headers: getHeader()
		});
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room: ${error.message}`);
    }
}

// GET BOOKING BY CONFIRMATION CODE
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(`Error: ${error.response.data}`);
        } else {
            throw new Error(`Error finding room: ${error.message}`);
        }
    }
}

// CANCEL BOOKING
export async function cancelBooking(bookingId) {
    try {
        const result = await api.get(`/bookings/booking/${bookingId}/delete`);
        return result.data;
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`);
    }
}

/* ###########################################  uSER AUTHENTICATION OPERATIONS  ########################################### */

// SIGN UP
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response;
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error: ${error.message}`);
        }
    }
}

// LOGIN
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);

        if(response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) { 
        console.error(error);
        return null;
    }
}

// GET USER PROFILE
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

// DELETE USER
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		});
		return response.data;
	} catch (error) {
		return error.message;
	}
}

// GET USER
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		});
		return response.data;
	} catch (error) {
        console.error("Error fetching user:", error.response || error.message);
		throw error;
	}
}

// GET USER BOOKING BY ID
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching bookings:", error.message);
		throw new Error("Failed to fetch bookings");
	}
}