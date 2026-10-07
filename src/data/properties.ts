import plot from "@/assets/cat-plot.jpg";
import factory from "@/assets/cat-factory.jpg";
import warehouse from "@/assets/cat-warehouse.jpg";
import hero from "@/assets/hero-industrial.jpg";

export type PropertyType = "industrial-plot" | "factory" | "industrial-shed" | "warehouse" | "commercial";
export type Transaction = "buy" | "rent";
export type LocationSlug = "bhiwadi" | "khushkhera" | "chopanki" | "tapukara";
export type Status = "Available" | "Under Discussion" | "Sold" | "Rented" | "Inactive";

export interface Property {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType;
  transactionType: Transaction;
  location: LocationSlug;
  address?: string;
  area?: string;
  areaSqm?: number;
  price?: string;
  roadWidth?: string;
  facing?: string;
  constructionStatus?: string;
  builtUpArea?: string;
  powerConnection?: string;
  waterAvailability?: string;
  craneCapacity?: string;
  officeSpace?: string;
  parking?: string;
  ownershipType?: string;
  approvalInformation?: string;
  description: string;
  features: string[];
  images: string[];
  status: Status;
  featured: boolean;
  /** Sample listing used during development — never a real availability claim. */
  isDemo: boolean;
}

export const PROPERTY_TYPES: { slug: PropertyType; route: string; label: string; plural: string; image: string; blurb: string }[] = [
  { slug: "industrial-plot", route: "industrial-plots", label: "Industrial Plot", plural: "Industrial Plots", image: plot, blurb: "Open RIICO and private industrial land for new units." },
  { slug: "factory", route: "factories", label: "Factory", plural: "Factories", image: factory, blurb: "Built factory premises ready for manufacturing." },
  { slug: "industrial-shed", route: "industrial-sheds", label: "Industrial Shed", plural: "Industrial Sheds", image: warehouse, blurb: "Steel-frame sheds for production and assembly." },
  { slug: "warehouse", route: "warehouses", label: "Warehouse", plural: "Warehouses", image: warehouse, blurb: "Storage and logistics space near key routes." },
  { slug: "commercial", route: "commercial", label: "Commercial Property", plural: "Commercial Properties", image: hero, blurb: "Shops, offices and commercial plots in the belt." },
];

export const typeLabel = (t: PropertyType) => PROPERTY_TYPES.find((p) => p.slug === t)?.label ?? t;
export const transactionLabel = (t: Transaction) => (t === "buy" ? "For Sale" : "Rent / Lease");

// DEMO DATA — sample listings for layout only. Replace with real inventory.
export const PROPERTIES: Property[] = [
  {
    id: "d1", slug: "sample-industrial-plot-khushkhera", title: "Sample Industrial Plot, RIICO Khushkhera",
    propertyType: "industrial-plot", transactionType: "buy", location: "khushkhera",
    area: "2,000 sq m", areaSqm: 2000, roadWidth: "Sample: 18 m", facing: "Sample: East",
    constructionStatus: "Open plot", description: "Sample listing showing how an open industrial plot is presented. Details will be updated with real inventory.",
    features: ["Boundary wall (sample)", "Corner plot (sample)"], images: [plot, hero], status: "Available", featured: true, isDemo: true,
  },
  {
    id: "d2", slug: "sample-factory-bhiwadi", title: "Sample Factory Premises, Bhiwadi",
    propertyType: "factory", transactionType: "rent", location: "bhiwadi",
    area: "1,500 sq m", areaSqm: 1500, builtUpArea: "Sample: 1,100 sq m", roadWidth: "Sample: 12 m",
    constructionStatus: "Built-up", powerConnection: "Sample entry", officeSpace: "Sample entry",
    description: "Sample listing showing how a built factory is presented. Specifications are placeholders.",
    features: ["Office block (sample)", "Loading shutter (sample)"], images: [factory, warehouse], status: "Available", featured: true, isDemo: true,
  },
  {
    id: "d3", slug: "sample-industrial-shed-chopanki", title: "Sample Industrial Shed, Chopanki",
    propertyType: "industrial-shed", transactionType: "rent", location: "chopanki",
    area: "3,000 sq m", areaSqm: 3000, builtUpArea: "Sample: 2,400 sq m", craneCapacity: "Sample entry",
    constructionStatus: "Built-up", description: "Sample listing showing how an industrial shed is presented.",
    features: ["High roof (sample)", "Skylights (sample)"], images: [warehouse, factory], status: "Under Discussion", featured: true, isDemo: true,
  },
  {
    id: "d4", slug: "sample-warehouse-tapukara", title: "Sample Warehouse, Tapukara",
    propertyType: "warehouse", transactionType: "rent", location: "tapukara",
    area: "4,000 sq m", areaSqm: 4000, roadWidth: "Sample: 24 m", constructionStatus: "Built-up",
    description: "Sample listing showing how warehouse space is presented.",
    features: ["Truck access (sample)"], images: [warehouse, hero], status: "Available", featured: false, isDemo: true,
  },
];

export const getProperty = (slug: string) => PROPERTIES.find((p) => p.slug === slug);

export interface Filters { type?: PropertyType; transaction?: Transaction; location?: LocationSlug; minArea?: number; maxArea?: number }

export function filterProperties(f: Filters) {
  return PROPERTIES.filter((p) =>
    p.status !== "Inactive" &&
    (!f.type || p.propertyType === f.type) &&
    (!f.transaction || p.transactionType === f.transaction) &&
    (!f.location || p.location === f.location) &&
    (!f.minArea || (p.areaSqm ?? 0) >= f.minArea) &&
    (!f.maxArea || (p.areaSqm ?? Infinity) <= f.maxArea),
  );
}
