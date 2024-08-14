import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/provider/StoreProvider";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppers Stop",
  description: "Ecommerce shopping cart application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="w-full shadow-sm fixed top-0 left-0 z-20 bg-white">
            <Navbar />
          </div>
          {children}
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
