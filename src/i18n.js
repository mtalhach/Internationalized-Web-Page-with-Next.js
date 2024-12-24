import { notFound } from "next/navigation";

const locales = ["en", "id"];

export default async function getRequestConfig({ locale }) {
  if (!locales.includes(locale)) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/content?locale=${locale}`);

  if (!res.ok) {
    notFound();
  }

  const content = await res.json();

  return {
    messages: content,
  };
}
