import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Calculate the total price of all items in the cart
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

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
                        {/* creates the internal scrollbar */}
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex justify-between items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm shrink-0">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded bg-zinc-100"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                        />
                                        <div>
                                            <h2 className="font-semibold text-lg">{item.title}</h2>
                                            <p className="text-blue-600 dark:text-blue-400 font-medium">${item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 rounded transition"
                                    >
                                        {t('cart.remove')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-1">
                        {/* box float and follow the user as they scroll */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                {t('cart.summary')}
                            </h2>

                            <div className="flex justify-between mb-4 text-zinc-600 dark:text-zinc-400">
                                <span>{t('cart.totalItems')}</span>
                                <span className="font-medium text-zinc-900 dark:text-white">{cartItems.length}</span>
                            </div>

                            <div className="flex justify-between mb-6 text-lg font-bold">
                                <span>{t('cart.totalPrice')}</span>
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