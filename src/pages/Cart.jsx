import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice'; // Added new actions
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // Calculate true total items
    const totalItemsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-500 text-lg mb-4">{t('cart.empty')}</p>
                    <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition inline-block">
                        {t('productDetails.backToHome')} {/* Reusing a translation key here! */}
                    </Link>
                </div>
            ) : (
                // The Main Grid Layout: 1 column on mobile, 3 columns on large screens
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side: Scrollable Products List (The Slider) */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm shrink-0 gap-4">

                                    {/* Product Image & Info */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded bg-zinc-100"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                        />
                                        <div>
                                            <h2 className="font-semibold text-lg line-clamp-1">{item.title}</h2>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium">${item.price}</p>
                                        </div>
                                    </div>

                                    {/* Actions: Quantity Controls & Remove */}
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        {/* Quantity Slider */}
                                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition text-zinc-600 dark:text-zinc-300 shadow-sm"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold text-sm">
                                                {item.quantity || 1}
                                            </span>
                                            <button
                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition text-zinc-600 dark:text-zinc-300 shadow-sm"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Trash/Remove Button */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                            title={t('cart.remove')}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                {t('cart.summary')}
                            </h2>

                            <div className="flex justify-between mb-4 text-zinc-600 dark:text-zinc-400">
                                <span>{t('cart.totalItems')}</span>
                                {/* Updated to use the new totalItemsCount */}
                                <span className="font-medium text-zinc-900 dark:text-white">{totalItemsCount}</span>
                            </div>

                            <div className="flex justify-between mb-6 text-lg font-bold">
                                <span>{t('cart.totalPrice')}</span>
                                {/* Shows calculated total price */}
                                <span className="text-blue-600 dark:text-blue-400">${totalPrice.toFixed(2)}</span>
                            </div>

                            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md">
                                {t('cart.checkout')}
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}