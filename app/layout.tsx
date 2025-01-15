import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./highlight.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Radix Playground",
    description: "Run Node.JS scripts in the browser"
};

export const viewport: Viewport = {
    themeColor: "#10b981"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`w-full h-full text-slate-100 bg-slate-950 ${inter.className}`}>
                {children}
            </body>
        </html>
    );
}