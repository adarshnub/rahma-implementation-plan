import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahma Implementation Plan",
  description:
    "Detailed implementation plan for the Rahma AI Guardian App Phase 1 pilot, with timeline, security, compliance, dependencies, and Phase 2 readiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
