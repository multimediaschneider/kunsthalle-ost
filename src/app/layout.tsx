import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kunsthalle Ost",
  description: "Contemporary Art Gallery in Leipzig",
};

// Import the Coconat font from the src/fonts directory
const coconat = localFont({
  src: [
    {
      path: "../fonts/Coconat-Regular.woff2", // updated path
      weight: "400",
      style: "normal",
    },
    // Add more variants here if needed
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={coconat.className}>{children}</body>
    </html>
  );
}
