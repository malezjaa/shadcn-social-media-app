import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import {getBaseUrl} from "@/lib/urls";
import {Metadata} from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Next.js Social app",
    template: "%s | Next.js Social app",
  },
  description: "This is a simple website made with ShadcnUi, Next.js and Tailwind.",
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: {
      default: "Next.js Social app",
      template: "%s | Next.js Social app",
    },
    description: "This is a simple website made with ShadcnUi, Next.js and Tailwind.",
    type: "website",
    url: getBaseUrl(),
  },
  twitter: {
    card: "summary",
    title: "Next.js Social app",
    description: "This is a simple website made with ShadcnUi, Next.js and Tailwind.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className={"h-screen"}>{children}</div>
      </body>
    </html>
  );
}
