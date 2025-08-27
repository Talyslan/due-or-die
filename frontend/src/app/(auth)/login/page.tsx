import { LoginSVG } from '@/components';
import { LoginForm } from './_components/LoginForm';

export default function Login() {
    return (
        <main className="flex h-screen w-full">
            <div className="bg-main-color-200 w-1/2 flex items-center justify-center">
                <LoginSVG className="transform scale-60" />
            </div>

            <LoginForm />
        </main>
    );
}
