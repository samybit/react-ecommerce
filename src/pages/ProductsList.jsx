import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch products
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=200')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => console.error("Failed to fetch products:", err));
    }, []);

    // Filter
    const filteredProducts = category
        ? products.filter(p => p.category.name.toLowerCase() === category.toLowerCase())
        : products;

    if (loading) {
        return <div className="text-xl font-bold text-center mt-20">Loading products...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                {category ? `Currently Browsing: ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </h1>

            <div className="flex gap-3 mb-8">
                <button onClick={() => setSearchParams({})} className="px-4 py-2 bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">All</button>
                <button onClick={() => setSearchParams({ category: 'electronics' })} className="px-4 py-2 bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition">Electronics</button>
                <button onClick={() => setSearchParams({ category: 'clothes' })} className="px-4 py-2 bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-800 transition">Clothes</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    // Added overflow-hidden to keep the image corners rounded inside the card
                    <div key={product.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm bg-white dark:bg-zinc-900 flex flex-col overflow-hidden">

                        {/* Product Image */}
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-48 object-cover bg-zinc-100"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                        />

                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">${product.price}</p>
                            <div className="mt-auto flex gap-2">
                                <Link
                                    to={`/product/${product.id}`}
                                    className="px-4 py-2 bg-zinc-200 text-zinc-900 rounded hover:bg-zinc-300 transition w-full text-center"
                                >
                                    Details
                                </Link>
                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}