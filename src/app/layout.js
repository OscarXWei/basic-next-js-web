// app/layout.js
"use client";

import './globals.css';
import Link from 'next/link';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// 创建一个单独的导航组件
function Navigation() {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();

    // 如果未认证，不显示导航栏
    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="bg-gray-50 border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            {t('about')}
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            {t('contact')}
                        </Link>
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            {t('products')}
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            <span className="mr-1">{language === 'en' ? '🇺🇸' : '🇨🇳'}</span>
                            {language === 'en' ? 'EN' : '中'}
                        </button>
                        <span className="text-gray-600">{t('welcome')}, {currentUser}!</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            {t('logout')}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

// 主布局组件
function RootLayoutInner({ children }) {
    return (
        <html lang="en">
            <body className="font-sans bg-white text-gray-900">
                <Navigation />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}

export default function RootLayout({ children }) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <RootLayoutInner>
                    {children}
                </RootLayoutInner>
            </AuthProvider>
        </LanguageProvider>
    );
}
