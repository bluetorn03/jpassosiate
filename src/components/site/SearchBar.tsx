import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PROPERTY_TYPES, type Filters } from "@/data/properties";
import { LOCATIONS } from "@/data/locations";

export function SearchBar({ initial = {} }: { initial?: Filters }) {
  const navigate = useNavigate();
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const search: Record<string, string | number> = {};
    if (d.type) search.type = d.type;
    if (d.transaction) search.transaction = d.transaction;
    if (d.location) search.location = d.location;
    if (d.minArea) search.minArea = Number(d.minArea);
    if (d.maxArea) search.maxArea = Number(d.maxArea);
    navigate({ to: "/properties", search: search as never });
  }
  const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground";
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.7fr_0.7fr_auto] lg:items-end">
      <div><label className={label} htmlFor="s-type">Property Type</label>
        <select id="s-type" name="type" defaultValue={initial.type ?? ""} className="field"><option value="">All types</option>{PROPERTY_TYPES.map((t) => <option key={t.slug} value={t.slug}>{t.label}</option>)}</select></div>
      <div><label className={label} htmlFor="s-tx">Transaction</label>
        <select id="s-tx" name="transaction" defaultValue={initial.transaction ?? ""} className="field"><option value="">Buy or Rent</option><option value="buy">Buy</option><option value="rent">Rent / Lease</option></select></div>
      <div><label className={label} htmlFor="s-loc">Location</label>
        <select id="s-loc" name="location" defaultValue={initial.location ?? ""} className="field"><option value="">All locations</option>{LOCATIONS.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}</select></div>
      <div><label className={label} htmlFor="s-min">Min area (sq m)</label><input id="s-min" name="minArea" type="number" min={0} defaultValue={initial.minArea} className="field" /></div>
      <div><label className={label} htmlFor="s-max">Max area (sq m)</label><input id="s-max" name="maxArea" type="number" min={0} defaultValue={initial.maxArea} className="field" /></div>
      <button className="flex items-center justify-center gap-2 rounded-md bg-steel px-5 py-2.5 text-sm font-semibold text-steel-foreground hover:bg-graphite sm:col-span-2 lg:col-span-1">
        <Search className="h-4 w-4" />Search Properties
      </button>
    </form>
  );
}
