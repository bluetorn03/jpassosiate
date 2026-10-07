import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Search, Route as RouteIcon, Handshake, MapPinned, ClipboardList, Star } from "lucide-react";
import hero from "@/assets/hero-industrial.jpg";
import { PROPERTIES, PROPERTY_TYPES } from "@/data/properties";
import { LOCATIONS } from "@/data/locations";
import { BUSINESS } from "@/data/business";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SearchBar } from "@/components/site/SearchBar";
import { RequirementForm } from "@/components/site/RequirementForm";
import { ContactBlock, RatingBlock } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "JP Associate — Industrial Property Consultants in Bhiwadi & Khushkhera" },
      { name: "description", content: "Industrial plots, factories, sheds and warehouses across Bhiwadi, Khushkhera, Chopanki and Tapukara. Buy, sell or rent with JP Associate." },
      { property: "og:title", content: "JP Associate — Industrial Property in Bhiwadi & Khushkhera" },
      { property: "og:description", content: "Find the right industrial property for your business in the Bhiwadi–Khushkhera industrial belt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const WHY = [
  { icon: Compass, t: "Local Industrial Market Knowledge", d: "Focused on the Bhiwadi–Khushkhera industrial belt." },
  { icon: Search, t: "Property Search Assistance", d: "Help shortlisting plots, factories and sheds." },
  { icon: RouteIcon, t: "Site Visit Coordination", d: "Visits arranged around your schedule." },
  { icon: Handshake, t: "Buy / Sell / Rent Assistance", d: "Support on every side of the transaction." },
  { icon: ClipboardList, t: "Requirement-Based Matching", d: "Options matched to your area, power and access needs." },
  { icon: MapPinned, t: "Transaction Coordination", d: "Coordination with owners through to closing." },
];

const STEPS = ["Share Your Requirement", "Get Matching Properties", "Visit & Evaluate", "Proceed With the Transaction"];

function Index() {
  const featured = PROPERTIES.filter((p) => p.featured);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Industrial estate with factory sheds and plots in Rajasthan" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-x py-24 text-graphite-foreground md:py-36">
          <p className="eyebrow !text-amber">Industrial Property Consultants · Bhiwadi & Khushkhera</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">Find the Right Industrial Property for Your Business</h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">Industrial plots, factories, sheds and commercial properties across Bhiwadi, Khushkhera and nearby industrial areas.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3.5 text-sm font-bold text-amber-foreground">View Properties <ArrowRight className="h-4 w-4" /></Link>
            <a href="#requirement" className="rounded-md border border-graphite-foreground/40 px-6 py-3.5 text-sm font-bold hover:bg-graphite-foreground/10">Submit Your Requirement</a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-graphite-foreground/20 pt-6 text-sm">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber text-amber" /><b>{BUSINESS.rating}★</b> Google Rating</span>
            <span><b>{BUSINESS.reviewCount}</b> Google Reviews</span>
            <span>Industrial Property Specialists</span>
            <span>Bhiwadi • Khushkhera</span>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="container-x -mt-10 relative z-10">
        <h2 className="sr-only">Find an Industrial Property</h2>
        <SearchBar />
      </section>

      {/* FEATURED */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">Listings</p><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Featured Industrial Properties</h2></div>
          <Link to="/properties" className="text-sm font-semibold text-steel hover:underline">All properties →</Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Listings marked “Sample listing” illustrate the format and are not live availability.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      </section>

      {/* TYPES */}
      <section className="bg-surface py-20">
        <div className="container-x">
          <p className="eyebrow">Property Types</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">What are you looking for?</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROPERTY_TYPES.map((t) => (
              <Link key={t.slug} to="/properties" search={{ type: t.slug }} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
                <img src={t.image} alt={t.plural} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-graphite-foreground">
                  <h3 className="text-lg font-bold">{t.plural}</h3>
                  <p className="mt-1 text-xs opacity-80">{t.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="container-x py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">Why JP Associate</p><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">A local consultant for industrial property decisions.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
            {WHY.map(({ icon: I, t, d }) => (
              <div key={t} className="bg-card p-6"><I className="h-6 w-6 text-steel" /><h3 className="mt-4 font-bold">{t}</h3><p className="mt-1.5 text-sm text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="bg-graphite py-20 text-graphite-foreground">
        <div className="container-x">
          <p className="eyebrow !text-amber">Areas We Serve</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">The Bhiwadi–Khushkhera industrial belt</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATIONS.map((l, i) => (
              <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group rounded-lg border border-graphite-foreground/15 p-6 transition-colors hover:border-amber">
                <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-bold">{l.name}</h3>
                <p className="mt-2 text-sm opacity-70">{l.summary}</p>
                <span className="mt-6 inline-block text-sm font-semibold text-amber">Industrial property in {l.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x py-20">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">A simple four-step process</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="border-t-2 border-steel pt-5"><span className="font-mono text-3xl font-semibold text-steel">0{i + 1}</span><p className="mt-3 font-bold">{s}</p></li>
          ))}
        </ol>
      </section>

      {/* REVIEWS + ABOUT */}
      <section className="bg-surface py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-8 shadow-card">
            <p className="eyebrow">Google Reviews</p>
            <p className="mt-4 font-display text-6xl font-extrabold">{BUSINESS.rating}<span className="text-2xl text-muted-foreground"> / 5</span></p>
            <div className="mt-3"><RatingBlock /></div>
            <a href={BUSINESS.googleUrl} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-md border px-5 py-2.5 text-sm font-semibold hover:bg-muted">View on Google</a>
          </div>
          <div className="p-2 lg:p-8">
            <p className="eyebrow">About JP Associate</p>
            <h2 className="mt-2 text-3xl font-extrabold">Industrial property solutions in the Bhiwadi–Khushkhera region</h2>
            <p className="mt-4 text-muted-foreground">JP Associate focuses on industrial and real-estate property solutions in the Bhiwadi–Khushkhera region, helping buyers, sellers and businesses find suitable property options — from industrial plots and factories to sheds, warehouses and commercial property.</p>
            <Link to="/about" className="mt-6 inline-block text-sm font-semibold text-steel hover:underline">More about us →</Link>
          </div>
        </div>
      </section>

      {/* REQUIREMENT */}
      <section id="requirement" className="container-x scroll-mt-20 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Requirement</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Looking for a Specific Industrial Property?</h2>
            <p className="mt-4 text-muted-foreground">Tell us what you need and our team can help you explore suitable options.</p>
          </div>
          <RequirementForm />
        </div>
      </section>

      <section className="container-x pb-20"><ContactBlock /></section>
    </>
  );
}
