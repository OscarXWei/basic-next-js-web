"use client";

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAluminumProductById } from '../../utils/aluminumProducts';
import Link from 'next/link';

export default function ProductDetail({ params }) {
    const { language } = useLanguage();
    const unwrappedParams = React.use(params);

    const product = getAluminumProductById(unwrappedParams.id);

    if (!product) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {language === 'zh' ? '产品未找到' : 'Product Not Found'}
                    </h1>
                    <Link href="/products" className="text-blue-600 hover:text-blue-800">
                        {language === 'zh' ? '返回产品页面' : 'Back to Products'}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/products" className="hover:text-blue-600">
                        Products
                    </Link>
                    <span>›</span>
                    <span className="text-gray-800">{product.name}</span>
                </div>
            </nav>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Product Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Product Image */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 rounded-lg p-8">
                        <div className="relative w-full h-96 flex flex-col items-center justify-center">
                            <div className="text-8xl opacity-30 mb-4">🔹</div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-2">Product Code</p>
                                <p className="text-xl font-mono font-bold text-slate-700">{product.code}</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                    {product.category}
                                </span>
                                {product.popular && (
                                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                        Popular
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-2xl font-semibold text-slate-600">{product.price}</p>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            {product.description[language] || product.description.en}
                        </p>

                        {/* Key Features */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'zh' ? '主要特性' : 'Key Features'}
                            </h3>
                            <ul className="space-y-2">
                                {(product.features[language] || product.features.en).map((feature, index) => (
                                    <li key={`${product.id}-feature-${index}-${feature.replace(/\s+/g, '').slice(0, 15)}`} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button className="flex-1 bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                                {language === 'zh' ? '获取报价' : 'Get Quote'}
                            </button>
                            <button className="flex-1 border-2 border-slate-600 text-slate-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 hover:text-white transition-colors">
                                {language === 'zh' ? '请求样品' : 'Request Sample'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="border-t border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {language === 'zh' ? '技术规格' : 'Technical Specifications'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(product.specs[language] || product.specs.en).map((spec, index) => (
                            <div key={`${product.id}-spec-${index}-${spec.label.replace(/\s+/g, '').slice(0, 15)}`} className="border-b border-gray-100 pb-4">
                                <dt className="font-semibold text-gray-900 mb-2">{spec.label}</dt>
                                <dd className="text-gray-700">{spec.value}</dd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 bg-slate-50 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '定制服务' : 'Custom Finishes'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '提供定制颜色和纹理服务' : 'Custom colors and textures available'}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🧪</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '质量保证' : 'Quality Assured'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '符合国际质量标准' : 'Meets international quality standards'}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '长期保修' : 'Extended Warranty'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '提供最长25年质保' : 'Up to 25-year warranty available'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
