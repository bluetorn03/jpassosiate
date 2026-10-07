import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Industrial Plot Buy, Sell & Rent | JP Associate" },
      { name: "description", content: "Industrial plot buying, selling and renting, site visits, construction work and property finance support in Bhiwadi and Khushkhera." },
      { property: "og:title", content: "Services — JP Associate" },
      { property: "og:description", content: "Buy, sell or rent industrial property in Bhiwadi and Khushkhera." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const SERVICES = [
  ["Industrial Plot Buy", "Find industrial plots that fit your area, access and budget."],
  ["Industrial Plot Sell", "List your plot and reach industrial buyers."],
  ["Industrial Plot Rent", "Lease options for plots, factories and sheds."],
  ["Flats / Villas", "Residential options in the region."],
  ["Construction Work", "Support for building on your property."],
  ["Property Site Visits", "Coordinated visits to shortlisted properties."],
  ["Property Assistance", "Guidance through the transaction process."],
  ["Property Finance Support", "Help connecting with finance options."],
];

function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="How we help" intro="Practical support for buying, selling and renting property in the Bhiwadi–Khushkhera belt." />
      <section className="container-x py-16">
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(([t, d], i) => (
            <div key={t} className="bg-card p-6"><span className="font-mono text-xs text-steel">0{i + 1}</span><h2 className="mt-4 text-lg font-bold">{t}</h2><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
        <Link to="/contact" className="mt-10 inline-block rounded-md bg-graphite px-6 py-3 text-sm font-semibold text-graphite-foreground hover:bg-steel">Discuss your requirement</Link>
      </section>
    </>
  );
}
