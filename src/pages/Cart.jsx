import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-zinc-500">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex justify-between items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
                            <div className="flex items-center gap-4">
                                <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="text-zinc-600 dark:text-zinc-400">${item.price}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 rounded transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}