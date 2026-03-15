import { useParams, useNavigate } from 'react-router';

export default function ProductDetails() {
    const { id } = useParams(); // Extracts the dynamic :id from the URL
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center bg-white dark:bg-zinc-900 shadow-sm">
            <h1 className="text-3xl font-bold mb-4">Product Details</h1>

            <p className="text-lg mb-8 text-zinc-700 dark:text-zinc-300">
                Fetching detailed data for Product ID:
                <span className="ml-2 font-mono bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-blue-600 dark:text-blue-400">
                    {id}
                </span>
            </p>

            <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 transition"
            >
                Back to Home
            </button>
        </div>
    );
}