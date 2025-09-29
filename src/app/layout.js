import "./globals.css";
import Navigation from "./components/Navigation";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata = {
  title: "Darley Aluminium - Customer Portal",
  description: "Access your Darley Aluminium customer portal to track orders, view project status, and manage your account.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
