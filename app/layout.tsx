import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REVGNG Worldwide",
  description: "luv, revgng & dreamz"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}