import React, { useContext } from 'react';

const AuthStorageContext = React.createContext();

export const AuthStorageProvider = ({ value, children }) => {
    return (
        <AuthStorageContext.Provider value={value}>
            {children}
        </AuthStorageContext.Provider>
    );
};

export const useAuthStorage = () => useContext(AuthStorageContext);