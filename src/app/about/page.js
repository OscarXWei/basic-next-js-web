"use client";

import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
    const { t } = useLanguage();
    
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">📖 {t('aboutMe')}</h1>
                <p className="text-lg text-gray-600 mb-3">
                    {t('aboutIntro')}
                </p>
                <p className="text-lg text-gray-600">
                    {t('aboutDescription')}
                </p>
            </div>
        </main>
    );
}
