import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { BUSINESS, fullAddress, telLink, waLink } from "@/data/business";
import { LOCATIONS } from "@/data/locations";
import { PROPERTY_TYPES } from "@/data/properties";

const NAV = [
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/locations/khushkhera", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-sm bg-graphite font-display text-sm font-bold text-graphite-foreground">JP</span>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-bold">JP Associate</span>
        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Industrial Property</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={telLink} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">
            <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
          </a>
          <Link to="/contact" hash="requirement" className="rounded-md bg-graphite px-4 py-2 text-sm font-semibold text-graphite-foreground hover:bg-steel">
            Submit Requirement
          </Link>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <nav className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-base font-medium">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-graphite text-graphite-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-lg font-bold">JP Associate</p>
          <p className="mt-3 text-sm opacity-70">Industrial property consultants serving Bhiwadi, Khushkhera and nearby industrial areas.</p>
        </div>
        <div>
          <p className="eyebrow !text-amber">Property Types</p>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {PROPERTY_TYPES.map((t) => (
              <li key={t.slug}><Link to="/properties" search={{ type: t.slug }} className="hover:opacity-100">{t.plural}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-amber">Locations</p>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {LOCATIONS.map((l) => (
              <li key={l.slug}><Link to="/locations/$slug" params={{ slug: l.slug }}>Industrial Property in {l.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm opacity-90">
          <p className="eyebrow !text-amber">Contact</p>
          <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{fullAddress}</p>
          <a href={telLink} className="flex gap-2"><Phone className="h-4 w-4" />{BUSINESS.phoneDisplay}</a>
          <p className="flex gap-2"><Clock className="h-4 w-4" />{BUSINESS.hours}</p>
        </div>
      </div>
      <div className="border-t border-graphite-foreground/10">
        <div className="container-x py-5 text-xs opacity-60">© {new Date().getFullYear()} JP Associate. Property details are subject to verification at the time of enquiry.</div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t bg-background md:hidden">
      <a href={telLink} className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"><Phone className="h-4 w-4" />Call</a>
      <a href={waLink("Hello JP Associate, I am looking for an industrial property. Please share details.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-success py-3.5 text-sm font-semibold text-primary-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-14 md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBar />
    </div>
  );
}
