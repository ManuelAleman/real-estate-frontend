import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
