// app/contexts/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("currentUser");
        if (token && user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
        }
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser(userData);
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("currentUser", userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser("");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            currentUser,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
