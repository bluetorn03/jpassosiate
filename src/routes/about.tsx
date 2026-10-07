import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, RatingBlock, ContactBlock } from "@/components/site/Sections";
import { BUSINESS } from "@/data/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JP Associate — Industrial Property, Khushkhera" },
      { name: "description", content: "JP Associate is an industrial real-estate consultancy based at RIICO Khushkhera, serving Bhiwadi, Chopanki and Tapukara." },
      { property: "og:title", content: "About JP Associate" },
      { property: "og:description", content: "Industrial real-estate consultancy based at RIICO Khushkhera, Rajasthan." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="JP Associate" intro="Industrial and real-estate property solutions in the Bhiwadi–Khushkhera region." />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
          <p>JP Associate focuses on industrial and real-estate property solutions in the Bhiwadi–Khushkhera region, helping buyers, sellers and businesses find suitable property options.</p>
          <p>Our office is at {BUSINESS.address.line1}, {BUSINESS.address.locality}. We assist with industrial plot buying, selling and renting, as well as factories, sheds, warehouses, flats / villas, construction work, site visits and property finance support.</p>
          <p>The business is also known online as {BUSINESS.altName}.</p>
        </div>
        <div className="rounded-lg border bg-card p-8 shadow-card"><p className="eyebrow">Google</p><p className="mt-3 text-4xl font-extrabold">{BUSINESS.rating} / 5</p><div className="mt-2"><RatingBlock /></div></div>
      </section>
      <section className="container-x pb-20"><ContactBlock /></section>
    </>
  );
}
