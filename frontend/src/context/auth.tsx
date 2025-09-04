'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { app, fetcher } from '@/services';
import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { IActionResponse } from '@/action';
import { FirebaseError } from 'firebase/app';

type ICreateAccount = Omit<User, 'uid' | 'createdAt' | 'updatedAt'> & {
    password: string;
};

interface IAuthContext {
    user: User | null;
    handleSetUser(user: User | null): void;
    createAccount(data: ICreateAccount): Promise<IActionResponse<User>>;
    signIn(email: string, password: string): Promise<IActionResponse<User>>;
    signInWithGoogle(): Promise<IActionResponse<User>>;
    signOut(): Promise<IActionResponse<null>>;
}

const AuthContext = createContext({} as IAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const [user, setUser] = useState<User | null>(null);

    const handleSetUser = (user: User | null) => {
        setUser(user);
    };

    const createAccount = async (data: ICreateAccount) => {
        try {
            const userCredential = (
                await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password,
                )
            ).user;

            const userToCreate = {
                uid: userCredential.uid,
                name: userCredential.displayName ?? data.name,
                email: userCredential.email ?? data.email,
                photoUrl: userCredential.photoURL ?? '',
            };

            console.log(userCredential);
            console.log(userToCreate);

            const response = await fetcher('/users/', {
                method: 'POST',
                body: JSON.stringify(userToCreate),
            });

            console.log(userCredential);
            console.log(response);

            return {
                success: true,
                message: response.message,
                data: response.data as User,
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            const firebaseErrorMessages: Record<string, string> = {
                'auth/email-already-in-use': 'Este e-mail já está em uso.',
                'auth/invalid-email': 'O e-mail informado não é válido.',
                'auth/operation-not-allowed':
                    'Este método de cadastro não está habilitado.',
                'auth/weak-password':
                    'A senha deve ter pelo menos 6 caracteres.',
            };

            return {
                success: false,
                message:
                    firebaseErrorMessages[firebaseError.code] ??
                    firebaseError.message ??
                    'Erro ao criar conta',
                data: null,
            };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { uid, email: emailCredential } = (
                await signInWithEmailAndPassword(auth, email, password)
            ).user;

            const response = await fetcher('/users/login', {
                method: 'POST',
                body: JSON.stringify({ uid, email: emailCredential }),
            });

            const { data } = await fetcher<User>('/users/me');
            // handleSetUser(data);

            // console.log(user);

            return {
                success: true,
                message: response.message ?? 'Login realizado com sucesso',
                data,
            };
        } catch (error) {
            const firebaseError = error as FirebaseError;

            const firebaseErrorMessages: Record<string, string> = {
                'auth/user-not-found':
                    'Usuário não encontrado. Verifique o e-mail.',
                'auth/wrong-password': 'Senha incorreta. Tente novamente.',
                'auth/invalid-email': 'O e-mail informado não é válido.',
                'auth/invalid-credential':
                    'Credenciais inválidas. Verifique os dados.',
                'auth/too-many-requests':
                    'Muitas tentativas. Tente novamente mais tarde.',
                'auth/user-disabled': 'Esta conta foi desativada.',
            };

            const message =
                firebaseErrorMessages[firebaseError.code] ??
                firebaseError.message ??
                'Erro ao fazer login';

            return {
                success: false,
                message,
                data: null,
            };
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            await fetcher('/users/logout');

            handleSetUser(null);

            return {
                success: true,
                message: 'Logout realizado com sucesso',
                data: null,
            };
        } catch (error) {
            const err = error as Error;
            return {
                success: false,
                message: err.message ?? 'Erro ao sair',
                data: null,
            };
        }
    };

    const signInWithGoogle = async () => {
        try {
            const userCredential = (await signInWithPopup(auth, provider)).user;

            console.log(
                'Providers do usuário logado:',
                userCredential.providerData,
            );

            const hasPasswordMethod =
                userCredential.providerData[0].providerId === 'password';
            const hasGoogleMethod =
                userCredential.providerData[0].providerId === 'google.com';

            if (hasPasswordMethod && !hasGoogleMethod) {
                return {
                    success: false,
                    message:
                        'Este email já está cadastrado com senha. Faça login com email/senha para vincular.',
                    data: null,
                };
            }

            if (!hasPasswordMethod && !hasGoogleMethod) {
                await fetcher('/users/', {
                    method: 'POST',
                    body: JSON.stringify({
                        uid: userCredential.uid,
                        name: userCredential.displayName,
                        email: userCredential.email,
                        photoUrl: userCredential.photoURL ?? '',
                    }),
                });
            }

            const response = await fetcher('/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    uid: userCredential.uid,
                    email: userCredential.email,
                }),
            });

            const { data: user } = await fetcher<User>('/users/me');
            handleSetUser(user);

            return {
                success: true,
                message: response.message ?? 'Login com Google realizado',
                data: user,
            };
        } catch (error) {
            const err = error as Error;
            return {
                success: false,
                message: err.message ?? 'Erro ao entrar com Google',
                data: null,
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                handleSetUser,
                createAccount,
                signIn,
                signOut,
                signInWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
