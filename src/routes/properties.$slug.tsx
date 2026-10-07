import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { getProperty, PROPERTIES, typeLabel, transactionLabel, type Property } from "@/data/properties";
import { locationName } from "@/data/locations";
import { telLink, waLink } from "@/data/business";
import { DemoBadge, PropertyCard, StatusBadge } from "@/components/site/PropertyCard";
import { RequirementForm } from "@/components/site/RequirementForm";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const p = getProperty(params.slug);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.property;
    const title = p ? `${p.title} — JP Associate` : "Property — JP Associate";
    const desc = p ? `${typeLabel(p.propertyType)} ${transactionLabel(p.transactionType).toLowerCase()} in ${locationName(p.location)}. ${p.description}`.slice(0, 158) : "Industrial property details.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/properties/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center"><h1 className="text-3xl font-bold">Property not found</h1><Link to="/properties" className="mt-4 inline-block text-steel underline">Browse properties</Link></div>
  ),
  component: Detail,
});

const SPEC_FIELDS: [keyof Property, string][] = [
  ["area", "Plot Area"], ["builtUpArea", "Built-up Area"], ["roadWidth", "Road Width"], ["facing", "Facing"],
  ["powerConnection", "Power Connection"], ["waterAvailability", "Water"], ["constructionStatus", "Construction"],
  ["craneCapacity", "Crane Capacity"], ["officeSpace", "Office Space"], ["parking", "Parking"],
  ["ownershipType", "Ownership"], ["approvalInformation", "Approval / Documentation"],
];

function Detail() {
  const { property: p } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const specs = SPEC_FIELDS.filter(([k]) => p[k]);
  const related = PROPERTIES.filter((x) => x.id !== p.id && (x.propertyType === p.propertyType || x.location === p.location)).slice(0, 3);
  const wa = waLink(`Hello JP Associate, I am interested in "${p.title}" listed on your website. Please share more details.`);

  return (
    <>
      <section className="container-x py-8">
        <nav className="text-xs text-muted-foreground"><Link to="/properties">Properties</Link> / {p.title}</nav>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_140px]">
          <img src={p.images[img]} alt={p.title} width={1024} height={768} className="aspect-[16/9] w-full rounded-lg object-cover" />
          <div className="flex gap-3 lg:flex-col">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={`overflow-hidden rounded-md border-2 ${i === img ? "border-steel" : "border-transparent"}`}>
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-28 object-cover lg:w-full" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-1.5">{p.isDemo && <DemoBadge />}<StatusBadge status={p.status} /></div>
          <p className="eyebrow mt-4">{typeLabel(p.propertyType)} · {transactionLabel(p.transactionType)}</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{p.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-4 w-4" />{p.address ?? locationName(p.location)}</p>
          <p className="mt-4 text-2xl font-bold">{p.price ?? "Price on request"}</p>
          {p.isDemo && <p className="mt-4 rounded-md border border-amber bg-amber/10 p-3 text-sm">This is a sample listing used to show the page layout. It is not a real available property.</p>}

          <h2 className="mt-10 text-xl font-bold">Property Overview</h2>
          <p className="mt-3 text-muted-foreground">{p.description}</p>

          {specs.length > 0 && (<>
            <h2 className="mt-10 text-xl font-bold">Specifications</h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
              {specs.map(([k, label]) => (
                <div key={k} className="bg-card p-4"><dt className="font-mono text-[10px] uppercase text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{String(p[k])}</dd></div>
              ))}
            </dl>
          </>)}

          {p.features.length > 0 && (<>
            <h2 className="mt-10 text-xl font-bold">Features</h2>
            <ul className="mt-3 list-inside list-disc text-muted-foreground">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </>)}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="grid grid-cols-2 gap-2">
            <a href={wa} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-success py-3 text-sm font-semibold text-primary-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
            <a href={telLink} className="flex items-center justify-center gap-2 rounded-md bg-graphite py-3 text-sm font-semibold text-graphite-foreground"><Phone className="h-4 w-4" />Call</a>
          </div>
          <h2 className="pt-2 font-bold">Enquire about this property</h2>
          <RequirementForm propertyTitle={p.title} />
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-16"><div className="container-x">
          <h2 className="text-2xl font-extrabold">Related Properties</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PropertyCard key={r.id} p={r} />)}</div>
        </div></section>
      )}
    </>
  );
}
