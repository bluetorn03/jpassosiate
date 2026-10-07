import { Phone, MessageCircle, Navigation, Clock, MapPin, Star } from "lucide-react";
import { BUSINESS, fullAddress, telLink, waLink } from "@/data/business";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b bg-surface">
      <div className="container-x py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}

export function RatingBlock() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-amber text-amber" />)}</div>
      <span className="text-sm font-semibold">{BUSINESS.rating} / 5</span>
      <span className="text-sm text-muted-foreground">· {BUSINESS.reviewCount} Google Reviews</span>
    </div>
  );
}

export function ContactBlock() {
  const btn = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold";
  return (
    <div className="grid overflow-hidden rounded-lg border bg-card shadow-card md:grid-cols-2">
      <div className="p-8 md:p-10">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3 text-3xl font-extrabold">JP Associate</h2>
        <ul className="mt-6 space-y-4 text-sm">
          <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-steel" />{fullAddress}</li>
          <li className="flex gap-3"><Phone className="h-5 w-5 text-steel" /><a href={telLink} className="font-semibold">{BUSINESS.phoneDisplay}</a></li>
          <li className="flex gap-3"><Clock className="h-5 w-5 text-steel" />{BUSINESS.hours}</li>
        </ul>
        <div className="mt-8 grid gap-2 sm:grid-cols-3">
          <a href={telLink} className={`${btn} bg-graphite text-graphite-foreground hover:bg-steel`}><Phone className="h-4 w-4" />Call Now</a>
          <a href={waLink("Hello JP Associate, I would like to discuss an industrial property requirement.")} target="_blank" rel="noreferrer" className={`${btn} bg-success text-primary-foreground`}><MessageCircle className="h-4 w-4" />WhatsApp</a>
          <a href={BUSINESS.directionsUrl} target="_blank" rel="noreferrer" className={`${btn} border hover:bg-muted`}><Navigation className="h-4 w-4" />Directions</a>
        </div>
      </div>
      <iframe title="JP Associate location map" src={BUSINESS.mapEmbed} loading="lazy" className="min-h-[320px] w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
