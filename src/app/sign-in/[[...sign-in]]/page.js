"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#2d697d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/images/Darley_Logo.png"
            alt="Darley Aluminium Logo"
            className="w-16 h-16 object-contain mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Customer Portal</h1>
          <p className="text-blue-100">Sign in to track your orders and manage your account</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white",
              card: "bg-white shadow-2xl",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-600",
            }
          }}
        />
      </div>
    </div>
  );
}