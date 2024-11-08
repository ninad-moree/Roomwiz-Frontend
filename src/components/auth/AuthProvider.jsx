import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 

    const handleLogin = (token) => {
        const decodedUser = jwtDecode(token);
        localStorage.setItem("userId", decodedUser.sub);
		localStorage.setItem("userRole", decodedUser.roles);
		localStorage.setItem("token", token);
		setUser(decodedUser);
    }

    const handleLogout = (token) => {
        localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
    }

    return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext)
}
