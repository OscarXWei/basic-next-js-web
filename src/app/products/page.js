"use client";

import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';
import { aluminumProducts } from '../utils/aluminumProducts';

export default function ProductsPage() {
    const { language } = useLanguage();

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg p-8 mb-8 text-white">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="text-4xl">🏗️</div>
                    <h1 className="text-4xl font-bold">Aluminum Finish Products</h1>
                </div>
                <p className="text-xl text-blue-200 mb-4">
                    Professional-grade aluminum finishes for architectural excellence
                </p>
                <p className="text-blue-100">
                    Discover our comprehensive range of premium aluminum surface treatments,
                    engineered for durability, aesthetics, and performance in demanding applications.
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aluminumProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-slate-400"
                    >
                        {/* Product Image Placeholder */}
                        <div className="bg-gradient-to-br from-slate-100 to-blue-50 h-48 flex items-center justify-center relative overflow-hidden">
                            <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                                🔹
                            </div>
                            {product.popular && (
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Popular
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors">
                                    {product.name}
                                </h3>
                                <span className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                                    {product.code}
                                </span>
                            </div>

                            <p className="text-sm text-blue-600 font-medium mb-3">
                                {product.category}
                            </p>

                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                {product.description[language] || product.description.en}
                            </p>

                            {/* Key Features Preview */}
                            <div className="space-y-1 mb-4">
                                {product.features[language]?.slice(0, 2).map((feature, index) => (
                                    <div key={`${product.id}-feature-${index}-${feature.replace(/\s+/g, '').slice(0, 10)}`} className="flex items-start text-sm text-gray-600">
                                        <span className="text-green-500 mr-2 text-xs">✓</span>
                                        <span className="line-clamp-1">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-semibold">
                                    {product.price}
                                </span>
                                <span className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                                    View Details →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-slate-50 rounded-lg p-8 border border-gray-200">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Need Custom Finishes?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our technical team can help you select the perfect aluminum finish for your specific
                        project requirements. Contact us for samples, technical specifications, or custom color matching.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                            Request Samples
                        </button>
                        <button className="border-2 border-slate-600 text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 hover:text-white transition-colors">
                            Technical Support
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
