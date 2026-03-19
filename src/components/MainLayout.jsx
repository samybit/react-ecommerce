import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
    // Zustand (Theme & Auth)
    const { theme, toggleTheme } = useThemeStore();
    const { token, logout } = useAuthStore();

    // Redux (Cart)
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Context API (Localization)
    const { language, toggleLanguage } = useLanguage();

    // React Router
    const navigate = useNavigate();

    // Initialize the translation function
    const { t } = useTranslation();

    // Sync Zustand theme state with Tailwind's HTML dark class
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }, [theme]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <nav className="fixed top-0 w-full bg-white dark:bg-zinc-900 shadow p-4 flex justify-between items-center z-50">
                <div className="flex gap-6 items-center">
                    {/* 3. Replace text with t('object.key') */}
                    <Link to="/" className="font-bold text-blue-600 hover:text-blue-800">{t('navbar.home')}</Link>
                    <Link to="/cart" className="font-bold text-blue-600 hover:text-blue-800">
                        {t('navbar.cart')} ({cartItems.length})
                    </Link>
                    <span className="font-medium text-zinc-500">
                        {t('navbar.welcome')}
                    </span>
                </div>

                <div className="flex gap-3 items-center">
                    {token ? (
                        <button onClick={handleLogout} className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 rounded font-semibold transition">
                            {t('navbar.logout')}
                        </button>
                    ) : (
                        <Link to="/login" className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 rounded font-semibold transition">
                            {t('navbar.login')}
                        </Link>
                    )}

                    <button onClick={toggleLanguage} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>
                    <button onClick={toggleTheme} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">
                        {theme === 'light' ? t('navbar.darkMode') : t('navbar.lightMode')}
                    </button>
                </div>
            </nav>
            <main className="pt-20 p-4 w-full">
                <Outlet />
            </main>
        </div>
    );
}