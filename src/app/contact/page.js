"use client";

import { useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Message received: ${message}`);
        setMessage("");
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">📩 {t('contactUs')}</h1>
                <p className="text-lg text-gray-600 mb-6">{t('getInTouch')}</p>
                <p className="text-gray-600 mb-6">{t('contactDescription')}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={5}
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}
