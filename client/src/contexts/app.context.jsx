/* eslint-disable react/prop-types */
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth";
import { createContext, useState } from "react";

const initialAppContext = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    reset: () => null,
    token: getAccessTokenFromLS(),
    setToken: () => null
};

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initialAppContext.profile)
    const [token, setToken] = useState(initialAppContext.token)

    const reset = () => {
        setIsAuthenticated(false)
        setProfile(null)
        setToken(null)
    }

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                reset,
                token,
                setToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
