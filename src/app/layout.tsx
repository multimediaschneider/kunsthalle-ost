import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kunsthalle Ost",
  description: "Contemporary Art Gallery in Leipzig",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
