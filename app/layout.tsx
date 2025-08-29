import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sualtec Master System - Plataforma Integral Minera e Industrial",
  description: "La plataforma integral para la gestión de operaciones mineras e industriales. CRM, cotizaciones con IA, facturación y control total de procesos empresariales.",
  keywords: "minería, equipos mineros, CRM minero, cotizaciones IA, facturación digital, representación equipos europeos, procesamiento oro, procesamiento plata, metales preciosos, tecnología minera",
  authors: [{ name: "Sualtec Master System" }],
  creator: "Sualtec Master System",
  publisher: "Sualtec Master System",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "Sualtec Master System - Plataforma Integral Minera e Industrial",
    description: "Representación oficial de fabricantes europeos de equipos para minería de metales preciosos. CRM especializado, cotizaciones con IA y gestión integral.",
    type: "website",
    locale: "es_MX",
    siteName: "Sualtec Master System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sualtec Master System - Plataforma Integral Minera e Industrial",
    description: "Representación oficial de fabricantes europeos de equipos para minería de metales preciosos. CRM especializado, cotizaciones con IA y gestión integral.",
  },
  themeColor: "#0f172a",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
