"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { isSignedIn, user } = useUser();

    // Show navigation on all pages

    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname?.startsWith(href);
    };

    const navItems = [
        { href: '/portal', label: 'Portal' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1d2327] border-b border-[#2c3338] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/Darley_Logo.png"
                            alt="Darley Aluminium Logo"
                            className="w-50 h-50 object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors font-['Open_Sans'] ${isActiveLink(item.href)
                                    ? 'text-[#72aee6] border-b-2 border-[#72aee6] pb-1'
                                    : 'text-[#c3c4c7] hover:text-[#72aee6]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <SignInButton mode="modal">
                                <button className="bg-[#72aee6] hover:bg-[#2271b1] text-[#f0f0f1] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-['Open_Sans']">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-[#c3c4c7] hover:text-[#72aee6] hover:bg-[#2c3338] transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-[#2c3338] py-4">
                        <div className="space-y-4">
                            {navItems
                                .filter(item => !(isSignedIn && item.href === '/portal'))
                                .map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block text-sm font-medium transition-colors font-['Open_Sans'] ${isActiveLink(item.href)
                                        ? 'text-[#72aee6]'
                                        : 'text-[#c3c4c7] hover:text-[#72aee6]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-[#2c3338] space-y-2">
                                {isSignedIn ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-center">
                                            <UserButton />
                                        </div>
                                    </div>
                                ) : (
                                    <SignInButton mode="modal">
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full bg-[#72aee6] hover:bg-[#2271b1] text-[#f0f0f1] px-4 py-2 rounded-lg text-sm font-medium text-center transition-all duration-300 font-['Open_Sans']"
                                        >
                                            Sign In
                                        </button>
                                    </SignInButton>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
