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

    const register = (userData) => {
        // In a real app, this would make an API call to register the user
        // For now, we'll simulate successful registration and auto-login
        setIsAuthenticated(true);
        setCurrentUser(userData.username || userData.email.split('@')[0]);
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("currentUser", userData.username || userData.email.split('@')[0]);

        // Store user registration data (in real app, this would be handled by backend)
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const newUser = {
            email: userData.email,
            username: userData.username || userData.email.split('@')[0],
            registeredAt: new Date().toISOString()
        };
        existingUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
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
            register,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
