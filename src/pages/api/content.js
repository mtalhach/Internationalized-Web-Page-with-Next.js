export default function handler(req, res) {
  const { locale } = req.query;

  const data = {
    en: {
      title: "Welcome",
      description: "This is the English version of the site.",
      copyright: "© 2024 My Company",
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    id: {
      title: "Selamat datang",
      description: "Ini adalah versi bahasa Indonesia dari situs.",
      copyright: "© 2024 Perusahaan Saya",
      home: "Beranda",
      about: "Tentang",
      contact: "Kontak",
    },
  };

  const content = data[locale] || data["en"];
  res.status(200).json(content);
}
