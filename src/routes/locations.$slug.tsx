import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLocation, LOCATIONS } from "@/data/locations";
import { filterProperties } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PageHeader } from "@/components/site/Sections";
import { RequirementForm } from "@/components/site/RequirementForm";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const l = getLocation(params.slug);
    if (!l) throw notFound();
    return { location: l };
  },
  head: ({ loaderData, params }) => {
    const n = loaderData?.location.name ?? "Location";
    const title = `Industrial Property in ${n} — Plots, Factories & Sheds | JP Associate`;
    const desc = `Looking for industrial property in ${n}? JP Associate helps you buy, sell or rent industrial plots, factories, sheds and warehouses in ${n}.`;
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: `Industrial Property in ${n} — JP Associate` }, { property: "og:description", content: desc },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/locations/${params.slug}` }],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { location: l } = Route.useLoaderData();
  const list = filterProperties({ location: l.slug });
  return (
    <>
      <PageHeader eyebrow="Location" title={`Industrial Property in ${l.name}`} intro={l.summary} />
      <div className="container-x flex flex-wrap gap-2 pt-6">
        {LOCATIONS.map((x) => (
          <Link key={x.slug} to="/locations/$slug" params={{ slug: x.slug }} className={`rounded-full border px-4 py-1.5 text-sm ${x.slug === l.slug ? "bg-graphite text-graphite-foreground" : "hover:bg-muted"}`}>{x.name}</Link>
        ))}
      </div>
      <section className="container-x py-12">
        <h2 className="text-2xl font-extrabold">Properties in {l.name}</h2>
        {list.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        ) : <p className="mt-3 text-muted-foreground">No properties are listed online for {l.name} right now. Share your requirement below.</p>}
      </section>
      <section className="container-x grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div><h2 className="text-3xl font-extrabold">Need property in {l.name}?</h2><p className="mt-3 text-muted-foreground">Tell us your area, budget and use. We'll share options that fit.</p></div>
        <RequirementForm />
      </section>
    </>
  );
}
