import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Box from "@mui/material/Box";
import Footer from "@/components/Footer";
import GoogleTag from "@/components/GoogleTag";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import ThemeRegistry from "@/components/ThemeRegistry";
import TopBar from "@/components/TopBar";
import { SITE_URL } from "@/utils/nav";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Мобільний шиномонтаж в Одесі – Мобілшина",
    template: "%s | Мобілшина",
  },
  description:
    "Мобільний шиномонтаж в Одесі. Виїзд до клієнта за 30 хвилин. Якісно, швидко та зручно. Працюємо цілодобово!",
  authors: [{ name: "ФОП Краснов Сергій Ігорович" }],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Мобілшина",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body>
        <GoogleTag />
        <ThemeRegistry>
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <TopBar />
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
            {/* Bottom navigation is mobile-only; pad the page so it never covers content */}
            <Box sx={{ height: 64, display: { xs: "block", md: "none" } }} />
            <MobileBottomNav />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
