import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

// 1. Zod Schema
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    // 2. Initialize the Hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // 5. Form Submission & API Login
    const onSubmit = (data) => {
        console.log("Validated Form Data:", data);

        // server response
        const fakeToken = "fake-jwt-token-123";
        login(fakeToken);

        // Redirect after login
        navigate('/');
    };

    // 3 & 4. the UI & Display Errors
    return (
        <div className="max-w-md mx-auto mt-20 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm bg-white dark:bg-zinc-900">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded bg-transparent"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded bg-transparent"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}