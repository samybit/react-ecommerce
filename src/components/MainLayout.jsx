import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguage } from '../context/LanguageContext';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from 'react-i18next';
import { Store, ShoppingCart, Search, Menu, X } from 'lucide-react';


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

    // Search and Mobile Menu
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }, [theme]);

    // The Debounced Search Effect
    useEffect(() => {
        // Don't search if less than 2 characters
        if (searchTerm.trim().length < 2) {
            setSearchResults([]);
            setIsDropdownOpen(false);
            return;
        }

        // Wait 300ms after the user stops typing before fetching
        const delayDebounceFn = setTimeout(() => {
            fetch(`https://api.escuelajs.co/api/v1/products?title=${searchTerm}&limit=5`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data);
                    setIsDropdownOpen(true);
                })
                .catch(err => console.error("Search fetch error:", err));
        }, 300);

        // Cleanup function: clears the timeout if the user types again before 300ms hits
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsDropdownOpen(false); // Close the dropdown if they press Enter
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <nav className="fixed top-0 w-full bg-white dark:bg-zinc-900 shadow z-50 transition-all">
                <div className="p-4 flex flex-wrap justify-between items-center gap-y-4 max-w-7xl mx-auto">

                    {/* Left: Brand & Cart */}
                    <div className="flex gap-4 md:gap-6 items-center shrink-0">
                        <Link to="/" className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition">
                            <Store className="w-5 h-5" />
                            {/* Hide text on very small mobile screens to save space */}
                            <span className="hidden sm:inline">{t('navbar.home')}</span>
                        </Link>

                        <Link to="/cart" className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="hidden sm:inline">{t('navbar.cart')}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold">
                                {cartItems.length}
                            </span>
                        </Link>

                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden p-2 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Middle: The Search Bar & Dropdown */}
                    <div className="w-full md:w-auto md:flex-1 max-w-md order-last md:order-none relative">
                        <form onSubmit={handleSearch} className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-2 w-full focus-within:ring-2 ring-blue-500 transition">
                            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                            <input
                                type="text"
                                placeholder={t('navbar.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none px-2 w-full text-sm"
                            />
                        </form>

                        {/* The Dynamic Dropdown */}
                        {isDropdownOpen && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">
                                {searchResults.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        onClick={() => {
                                            setIsDropdownOpen(false); // Close dropdown on click
                                            setSearchTerm(''); // Clear the input
                                        }}
                                        className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                                    >
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-10 h-10 object-cover rounded bg-zinc-100 shrink-0"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                                        />
                                        <div className="flex-1 truncate text-left" dir="ltr">
                                            <p className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">{product.title}</p>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">${product.price}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Controls & Actions (Hidden on mobile unless menu is open) */}
                    <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} w-full md:w-auto md:flex flex-wrap md:flex-nowrap gap-3 items-center order-last md:order-none pt-4 md:pt-0 border-t md:border-t-0 border-zinc-200 dark:border-zinc-800`}>
                        {/* <span className="hidden lg:inline font-medium text-zinc-500 truncate max-w-[120px]">
                            {t('navbar.welcome')}
                        </span> */}

                        {token ? (
                            <button onClick={handleLogout} className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 rounded font-semibold transition text-sm text-center">
                                {t('navbar.logout')}
                            </button>
                        ) : (
                            <Link to="/login" className="flex-1 md:flex-none px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 rounded font-semibold transition text-sm text-center">
                                {t('navbar.login')}
                            </Link>
                        )}

                        <button onClick={toggleLanguage} className="flex-1 md:flex-none px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition rounded text-sm text-center font-bold">
                            {language === 'en' ? 'AR' : 'EN'}
                        </button>
                        <button onClick={toggleTheme} className="flex-1 md:flex-none px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition rounded text-sm text-center font-medium truncate">
                            {theme === 'light' ? t('navbar.darkMode') : t('navbar.lightMode')}
                        </button>
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-32 md:pt-24 p-4 w-full max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}