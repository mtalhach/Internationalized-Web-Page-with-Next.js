"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import Link from "next/link";
import LocalSwitcher from "../components/local-switcher";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Header() {
  const [navigationContent, setNavigationContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    async function fetchNavigationContent() {
      try {
        const res = await fetch(`/api/content?locale=${locale}`);
        if (!res.ok) throw new Error("Failed to fetch navigation content");
        const data = await res.json();
        setNavigationContent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching navigation content:", error);
        router.push("/404");
      }
    }

    fetchNavigationContent();
  }, [locale]);

  if (loading) {
    return <div>Loading footer...</div>;
  }

  if (!navigationContent) {
    return <div>Error loading footer content</div>;
  }

  return (
    <header className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white fixed top-0 w-full shadow-lg z-10">
      <nav className="flex items-center justify-between relative">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="./i18n.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-xl font-bold hover:text-yellow-400 transition-colors duration-300"
          >
            {navigationContent.home || "Home"}
          </Link>
          <Link
            href="/about"
            className="text-xl font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            {navigationContent.about || "About"}
          </Link>
          <Link
            href="/contact"
            className="text-xl font-semibold hover:text-yellow-400 transition-colors duration-300"
          >
            {navigationContent.contact || "Contact"}
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex items-center flex-col"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        {/* Mobile Menu Items */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/"
            className="block text-xl font-bold hover:text-yellow-400 mb-2"
          >
            {navigationContent.home || "Home"}
          </Link>
          <Link
            href="/about"
            className="block text-xl font-semibold hover:text-yellow-400 mb-2"
          >
            {navigationContent.about || "About"}
          </Link>
          <Link
            href="/contact"
            className="block text-xl font-semibold hover:text-yellow-400 mb-2"
          >
            {navigationContent.contact || "Contact"}
          </Link>
        </div>

        <LocalSwitcher />
      </nav>
    </header>
  );
}
