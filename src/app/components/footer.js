"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Footer() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    async function fetchFooterContent() {
      try {
        const res = await fetch(`/api/content?locale=${locale}`);
        if (!res.ok) throw new Error("Failed to fetch footer content");
        const data = await res.json();
        setContent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching footer content:", error);
        router.push("/404");
      }
    }

    fetchFooterContent();
  }, [locale]);

  if (loading) {
    return <div>Loading footer...</div>;
  }

  if (!content) {
    return <div>Error loading footer content</div>;
  }

  return (
    <div className="my-10 fixed bottom-0 justify-center align-center w-full text-center">
      <p className="text-lg text-gray-600 hover:text-purple-600 transition-colors duration-300">
        {content.copyright || "© 2024 My Company"}
      </p>
    </div>
  );
}
