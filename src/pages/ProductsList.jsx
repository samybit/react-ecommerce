import { useSearchParams, Link } from 'react-router';

const hardcodedProducts = [
    { id: 1, title: 'Wireless Headphones', price: 120, category: 'electronics' },
    { id: 2, title: 'T-Shirt', price: 25, category: 'clothing' },
    { id: 3, title: 'Keyboard', price: 85, category: 'electronics' },
    { id: 4, title: 'Jeans', price: 60, category: 'clothing' },
];

export default function ProductsList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Filter logic
    const filteredProducts = category
        ? hardcodedProducts.filter(p => p.category === category)
        : hardcodedProducts;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                {category ? `Currently Browsing: ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </h1>

            <div className="flex gap-3 mb-8">
                <button
                    onClick={() => setSearchParams({})}
                    className="px-4 py-2 bg-zinc-100 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                    All
                </button>
                <button
                    onClick={() => setSearchParams({ category: 'electronics' })}
                    className="px-4 py-2 bg-blue-600 text-blue-100 dark:bg-blue-900 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                >
                    Electronics
                </button>
                <button
                    onClick={() => setSearchParams({ category: 'clothing' })}
                    className="px-4 py-2 bg-green-600 text-green-100 dark:bg-green-900 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-800 transition"
                >
                    Clothing
                </button>
            </div>

            {/* Bonux: Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border border-zinc-200 dark:border-zinc-800 p-5 rounded-lg shadow-sm bg-white dark:bg-zinc-900 flex flex-col">
                        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">${product.price}</p>
                        <div className="mt-auto">
                            <Link
                                to={`/product/${product.id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full text-center"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}