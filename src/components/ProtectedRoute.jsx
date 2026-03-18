import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute() {
    const token = useAuthStore((state) => state.token);

    // If no token, redirect to /login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected child components
    return <Outlet />;
}