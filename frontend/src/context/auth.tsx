'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface IAuthContext {
    user: User | null;
    setUser(user: User | null): void;
}

const AuthContext = createContext({} as IAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
