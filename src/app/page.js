"use client";

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function HomePage() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2d697d]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg text-white">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2d697d] to-[#1e4a57] flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
                {/* Logo */}
                <div className="mb-8">
                    {/* <img
                        src="/images/Darley_Logo.png"
                        alt="Darley Aluminium Logo"
                        className="w-32 h-32 object-contain mx-auto mb-6"
                    /> */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Darley Aluminium
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8">
                        HomePage
                    </p>
                </div>

                {/* Description */}
                <div className="mb-12">
                    <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                        This is the placeholder for the Darley Aluminium Website HomePage. Click the button below to access the customer portal.
                    </p>
                </div>

                {/* Portal Button */}
                <div className="space-y-4">
                    {isSignedIn ? (
                        <Link
                            href="/portal"
                            className="inline-block bg-[#72aee6] hover:bg-[#2271b1] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Access Portal
                        </Link>
                    ) : (
                        <SignInButton mode="modal" forceRedirectUrl="/portal">
                            <button className="bg-[#72aee6] hover:bg-[#2271b1] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Access Portal
                            </button>
                        </SignInButton>
                    )}
                </div>

            </div>
        </div>
    );
}
