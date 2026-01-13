import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://www.villas-grande-anse.com"),
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        {/* Schema.org : Website */}
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Villas Grande Anse",
              alternateName: "Villas Grande Anse – Deshaies",
              url: "https://www.villas-grande-anse.com/",
            }),
          }}
        />

        {/* Schema.org : Organization */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Villas Grande Anse",
              url: "https://www.villas-grande-anse.com/",
              logo: "https://www.villas-grande-anse.com/logo.png",
            }),
          }}
        />

        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
