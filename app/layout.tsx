import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import NavBarHome from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Tu Vecindario",
  description: "Encuentra y conecta con tus vecinos fácilmente.",
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
          <QueryProvider>
            <NavBarHome />
              {children}
            <Footer />
          </QueryProvider>
      </body>
    </html>
  );
}
