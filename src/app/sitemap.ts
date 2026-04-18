import { MetadataRoute } from "next";
import { municipalities, slugify } from "@/lib/municipalities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://educacionsolar.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/factura`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/curso`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const guides = [
    "como-leer-factura-luma",
    "estafas-solares-puerto-rico",
    "incentivos-federales-2026",
    "baterias-solares-necesito",
    "net-metering-puerto-rico",
  ].map((slug) => ({
    url: `${baseUrl}/guia/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const municipalPages = municipalities.map((m) => ({
    url: `${baseUrl}/municipio/${slugify(m)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...guides, ...municipalPages];
}
