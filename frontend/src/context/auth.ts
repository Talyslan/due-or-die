'use client';
import { createContext, useContext, useState } from 'react';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    deleteUser,
    reauthenticateWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { firstLetterToUpperCase } from '@/utils';
import { fetcher, app } from '@/services';

interface IGoogleData {
    displayName: string;
    photoURL: string;
    email: string;
}

interface IAuthContext {
    user: User | null;
    googleData: IGoogleData;
    isAuthenticating: boolean;
    signIn(): Promise<void>;
    signOut(): void;
    handleSetGoogleData(data: IGoogleData): void;
    handleSetUser(user: User | null): void;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [googleData, setGoogleData] = useState<IGoogleData>({
        displayName: '',
        email: '',
        photoURL: '',
    });

    const handleSetUser = (user: User | null) => {
        setUser(user);
    };

    const signIn = async () => {
        const {
            displayName,
            email,
            photoURL,
        } = (await signInWithPopup(auth, provider)).user;

        setGoogleData({
            displayName: firstLetterToUpperCase(String(displayName)),
            email: String(email),
            photoURL: String(photoURL),
        });

        const user = await fetcher<User>('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });

        if (response?.status === 401) {
            return router.replace('/register');
        }

        const { data: user } = await fetcher<User>('/users/me');

        handleSetUser(user);
        
        window.location.href = '/simple-list';
    };

    const signOut = async () => {
        await auth.signOut();
        const { error } = await fetcher('/users/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (error) {
            return toast.error('Erro ao tentar realizar o logout.');
        }

        setUser(null);
        router.replace('/');
    };

    const handleSetGoogleData = (data: IGoogleData) => {
        setGoogleData(data);
    };

    const deleteAccount = async () => {
        try {
            if (auth.currentUser) {
                await reauthenticateWithPopup(auth.currentUser, provider);
                await fetcher('/users', {
                    method: 'DELETE',
                });
                await deleteUser(auth.currentUser);
                await signOut();
                toast.success(
                    `Que triste... Sua conta foi deletada :(
                    Esperamos ter você aqui novamente.`,
                );
            }
        } catch (err: any) {
            console.error(err.message);
            err.message === 'Firebase: Error (auth/user-mismatch).'
                ? toast.error(`As contas do Google não coincidem.`)
                : toast.error(`Algo deu errado :(`);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                handleSetUser,
                currentUserType,
                handleChangeUserTypeCookie,
                handleSetGoogleData,
                googleData,
                user,
                isAuthenticating,
                deleteAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
