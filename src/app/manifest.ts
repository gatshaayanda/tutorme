import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TutorMe Tuition Center & Student Boarding House",
    short_name: "TutorMe",
    description: "TutorMe tuition, student boarding and learning companion for Block 8, Gaborone.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F7FBFD",
    theme_color: "#1FA2DE",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["education", "lifestyle"],
    icons: [
      { src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };
}