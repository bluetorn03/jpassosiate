import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { filterProperties, PROPERTY_TYPES } from "@/data/properties";
import { LOCATIONS } from "@/data/locations";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SearchBar } from "@/components/site/SearchBar";
import { PageHeader } from "@/components/site/Sections";
import { RequirementForm } from "@/components/site/RequirementForm";

const searchSchema = z.object({
  type: z.enum(["industrial-plot", "factory", "industrial-shed", "warehouse", "commercial"]).optional().catch(undefined),
  transaction: z.enum(["buy", "rent"]).optional().catch(undefined),
  location: z.enum(["bhiwadi", "khushkhera", "chopanki", "tapukara"]).optional().catch(undefined),
  minArea: z.number().optional().catch(undefined),
  maxArea: z.number().optional().catch(undefined),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: searchSchema,
  component: Listing,
  head: () => ({
    meta: [
      { title: "Industrial Properties in Bhiwadi & Khushkhera — JP Associate" },
      { name: "description", content: "Search industrial plots, factories, sheds and warehouses for sale or rent in Bhiwadi, Khushkhera, Chopanki and Tapukara." },
      { property: "og:title", content: "Industrial Properties — JP Associate" },
      { property: "og:description", content: "Search industrial plots, factories, sheds and warehouses in the Bhiwadi–Khushkhera belt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
});

function Listing() {
  const s = Route.useSearch();
  const results = filterProperties(s);
  const typeName = PROPERTY_TYPES.find((t) => t.slug === s.type)?.plural;
  const locName = LOCATIONS.find((l) => l.slug === s.location)?.name;
  const title = `${typeName ?? "Industrial Properties"}${locName ? ` in ${locName}` : ""}`;
  return (
    <>
      <PageHeader eyebrow="Properties" title={title} intro="Filter by type, transaction, location and area. Contact us for options not yet listed." />
      <section className="container-x -mt-8"><SearchBar key={JSON.stringify(s)} initial={s} /></section>
      <section className="container-x py-12">
        <p className="text-sm text-muted-foreground">{results.length} result{results.length === 1 ? "" : "s"} · Listings marked “Sample listing” are illustrative, not live availability.</p>
        {results.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="mt-6 grid gap-8 rounded-lg border bg-surface p-8 lg:grid-cols-2">
            <div><h2 className="text-2xl font-bold">No listed property matches yet</h2><p className="mt-2 text-muted-foreground">Many options are not published online. Share your requirement and we will look for matching properties.</p></div>
            <RequirementForm />
          </div>
        )}
      </section>
    </>
  );
}
