import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Radix Playground",
    description: "Run Node.JS scripts in the browser"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`w-full h-full text-slate-100 bg-slate-950 ${inter.className}`}>
                {children}
            </body>
        </html>
    );
}