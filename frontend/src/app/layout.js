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
      {/* Google Tag Manager (prioritaire pour analytics/ads) */}
      <Script
        id="gtm"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T2VFWL7K');`,
        }}
      />
      {/* End Google Tag Manager */}

      <body className="flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T2VFWL7K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
