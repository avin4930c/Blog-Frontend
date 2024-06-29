import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
    authToken: null,
    user: null,
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const isTokenExpired = decodedToken.exp * 1000 < Date.now();
            if (isTokenExpired) {
                logout();
            } else {
                setAuthToken(token);
                fetchUserData(token);
            }
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/fetchUser`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 401) {
                logout();
                return;
            }
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.log('Failed to fetch user Data', error);
        }
    }

    const login = (token) => {
        sessionStorage.setItem('token', token);
        setAuthToken(token);
        fetchUserData(token);
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;