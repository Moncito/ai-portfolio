import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moncito Glenn — Portfolio OS",
  description: "Full-Stack Creative Developer | 3D Web Experiences | AI-Powered Applications",
  keywords: ["Full Stack Developer", "3D Web", "TypeScript", "Next.js", "React", "Three.js"],
  authors: [{ name: "Moncito Glenn N. Hernandez" }],
  openGraph: {
    title: "Moncito Glenn — Portfolio OS",
    description: "Full-Stack Creative Developer specializing in immersive 3D web experiences and AI applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
