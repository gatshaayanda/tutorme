import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "TutorMe Tuition Center",
    short_name: "TutorMe",
    description: "Private academic tuition and learning support in Block 8, Gaborone.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F7FBFD",
    theme_color: "#1FA2DE",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["education"],
    icons: [
      { src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}