"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`/api/content?locale=${locale}`);
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setContent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
        router.push("/404");
      }
    }

    fetchContent();
  }, [locale]);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg text-gray-600">Loading...</div>
    );
  }

  if (!content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg shadow-lg mt-32">
      <h1 className="text-4xl mb-4 font-semibold">{content.title}</h1>
      <p className="text-lg">{content.description}</p>
    </div>
  );
}
