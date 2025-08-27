export interface User {
    id: string;
    name: string;
    email: string;
    photoURL?: string | undefined;
}

export interface UserWithPassword {
    id: string;
    name: string;
    email: string;
    password: string;
    photoURL?: string | undefined;
}
