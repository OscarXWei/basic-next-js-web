"use client";

import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';

export default function ProductsPage() {
    const { t } = useLanguage();
    const products = [
        { id: 1, name: "iPhone 16 Pro" },
        { id: 2, name: "MacBook Pro" },
        { id: 3, name: "Apple Watch" },
        { id: 4, name: "iPad Pro" },
        { id: 5, name: "AirPods Pro" },
        { id: 6, name: "HomePod" }
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">🛍️ {t('ourProducts')}</h1>
                <p className="text-lg text-gray-600 mb-6">{t('exploreProducts')}</p>
                <p className="text-gray-600 mb-6">{t('productDescription')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <Link
                            key={p.id}
                            href={`/products/${p.id}`}
                            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
