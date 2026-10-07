import type { LocationSlug } from "./properties";

export const LOCATIONS: { slug: LocationSlug; name: string; summary: string }[] = [
  { slug: "bhiwadi", name: "Bhiwadi", summary: "Established industrial town on the Rajasthan–Haryana border, home to a wide range of manufacturing units." },
  { slug: "khushkhera", name: "Khushkhera", summary: "RIICO industrial area near Bhiwadi where JP Associate's office is located." },
  { slug: "chopanki", name: "Chopanki", summary: "RIICO industrial area in the Bhiwadi belt with plots and built units." },
  { slug: "tapukara", name: "Tapukara", summary: "Industrial area in the Bhiwadi–Khushkhera region." },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const locationName = (slug: string) => getLocation(slug)?.name ?? slug;
