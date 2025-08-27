import { RegisterSVG } from '@/components';
import { RegisterForm } from './_components/RegisterForm';

export default function Register() {
    return (
        <main className="flex h-screen w-full">
            <div className="bg-main-color-200 w-1/2 flex items-center justify-center">
                <RegisterSVG className="transform scale-60" />
            </div>

            <RegisterForm />
        </main>
    );
}
