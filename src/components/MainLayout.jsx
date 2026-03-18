import { useEffect } from 'react';
import { Outlet, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';

export default function MainLayout() {
    // Zustand
    const { theme, toggleTheme } = useThemeStore();
    // Redux
    const cartItems = useSelector((state) => state.cart.cartItems);
    // Context API
    const { language, toggleLanguage } = useLanguage();

    // Sync Zustand with Tailwind
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }, [theme]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <nav className="fixed top-0 w-full bg-white dark:bg-zinc-900 shadow p-4 flex justify-between items-center z-50">
                <div className="flex gap-6 items-center">
                    <Link to="/" className="font-bold text-blue-600 hover:text-blue-800">Home</Link>
                    <Link to="/cart" className="font-bold text-blue-600 hover:text-blue-800">
                        Cart ({cartItems.length})
                    </Link>
                    <span className="font-medium text-zinc-500">
                        {language === 'en' ? 'Welcome' : 'مرحباً'}
                    </span>
                </div>

                <div className="flex gap-3">
                    <button onClick={toggleLanguage} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>
                    <button onClick={toggleTheme} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            </nav>
            <main className="pt-20 p-4 w-full">
                <Outlet />
            </main>
        </div>
    );
}