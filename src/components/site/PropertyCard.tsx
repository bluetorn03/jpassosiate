import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle } from "lucide-react";
import { type Property, typeLabel, transactionLabel } from "@/data/properties";
import { locationName } from "@/data/locations";
import { waLink } from "@/data/business";

export function StatusBadge({ status }: { status: Property["status"] }) {
  const tone = status === "Available" ? "bg-success/15 text-success" : "bg-amber/20 text-amber-foreground";
  return <span className={`rounded-sm px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${tone}`}>{status}</span>;
}

export function DemoBadge() {
  return <span className="rounded-sm bg-graphite px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-graphite-foreground">Sample listing</span>;
}

export function PropertyCard({ p }: { p: Property }) {
  const specs = [
    ["Area", p.area],
    ["Road", p.roadWidth],
    ["Status", p.constructionStatus],
  ].filter(([, v]) => v) as [string, string][];
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-card">
      <Link to="/properties/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden">
        <img src={p.images[0]} alt={p.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {p.isDemo && <DemoBadge />}
          <StatusBadge status={p.status} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{typeLabel(p.propertyType)} · {transactionLabel(p.transactionType)}</p>
        <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{locationName(p.location)}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-y py-3">
          {specs.map(([k, v]) => (
            <div key={k}><dt className="font-mono text-[10px] uppercase text-muted-foreground">{k}</dt><dd className="mt-0.5 text-sm font-semibold">{v}</dd></div>
          ))}
        </dl>
        <p className="mt-3 text-sm font-semibold">{p.price ?? "Price on request"}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to="/properties/$slug" params={{ slug: p.slug }} className="rounded-md bg-graphite py-2.5 text-center text-sm font-semibold text-graphite-foreground hover:bg-steel">View Details</Link>
          <a href={waLink(`Hello JP Associate, I am interested in "${p.title}" listed on your website. Please share more details.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-md border py-2.5 text-sm font-semibold hover:bg-muted">
            <MessageCircle className="h-4 w-4 text-success" />WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
