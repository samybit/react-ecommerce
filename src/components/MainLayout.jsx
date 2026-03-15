import { Outlet, Link } from 'react-router';

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <nav className="fixed top-0 w-full bg-white dark:bg-zinc-900 shadow p-4 flex gap-6 z-50">
                <Link to="/" className="font-bold text-blue-600 hover:text-blue-800">Home</Link>
                <Link to="/cart" className="font-bold text-blue-600 hover:text-blue-800">Cart</Link>
            </nav>

            <main className="pt-20 p-4 max-w-6xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}