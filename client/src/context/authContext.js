import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import newRequest from '../utils/newReq'


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await newRequest.post("/auth/login", inputs );
        setCurrrentUser(res.data);
    }

    const logout = async () => {
        const res = await newRequest.post("/auth/logout");
        setCurrrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser]);

    return(
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
} 