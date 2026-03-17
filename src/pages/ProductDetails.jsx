import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { Skeleton } from "../components/ui/skeleton";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the single product by ID
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => console.error("Failed to fetch product details:", err));
    }, [id]);

    // Shadcn Skeleton
    if (loading) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm bg-white dark:bg-zinc-900">
                <Skeleton className="h-[300px] w-full rounded-xl mb-6 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-10 w-3/4 mb-4 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-6 w-1/4 mb-6 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-24 w-full mb-8 bg-zinc-200 dark:bg-zinc-800" />
                <Skeleton className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800" />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center mt-10 text-xl text-red-500">Product not found.</div>;
    }

    // Actual UI once data is loaded
    return (
        <div className="max-w-2xl mx-auto mt-10 overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
            <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-[400px] object-cover bg-zinc-100"
                onError={(e) => e.target.src = 'https://via.placeholder.com/600'}
            />

            <div className="p-8">
                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                    ${product.price}
                </p>

                <p className="text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed">
                    {product.description}
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}