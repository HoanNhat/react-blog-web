import React, { createContext, useState } from 'react';

export const UserContext = createContext();
// ReactSession.setStoreType("localStorage");

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
