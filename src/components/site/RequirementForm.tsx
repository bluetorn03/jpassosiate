import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { PROPERTY_TYPES } from "@/data/properties";
import { LOCATIONS } from "@/data/locations";
import { waLink } from "@/data/business";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{8,15}$/, "Enter a valid phone number"),
  whatsapp: z.string().trim().max(20).optional(),
  email: z.string().trim().email("Enter a valid email").max(120).optional().or(z.literal("")),
  requirement: z.enum(["Buy", "Sell", "Rent / Lease"]),
  propertyType: z.string().min(1, "Choose a property type"),
  location: z.string().max(60).optional(),
  area: z.string().max(60).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().max(1000).optional(),
});

type Values = z.infer<typeof schema>;

export function RequirementForm({ propertyTitle }: { propertyTitle?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const v: Values = parsed.data;
    const lines = [
      `Hello JP Associate, I am looking for an industrial property.`,
      propertyTitle && `Property: ${propertyTitle}`,
      `Name: ${v.name}`, `Phone: ${v.phone}`, v.whatsapp && `WhatsApp: ${v.whatsapp}`, v.email && `Email: ${v.email}`,
      `Requirement: ${v.requirement}`, `Type: ${v.propertyType}`, v.location && `Location: ${v.location}`,
      v.area && `Area: ${v.area}`, v.budget && `Budget: ${v.budget}`, v.message && `Message: ${v.message}`,
    ].filter(Boolean).join("\n");
    setDone(waLink(lines));
  }

  if (done) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 text-xl font-bold">Your requirement is ready</h3>
        <p className="mt-2 text-sm text-muted-foreground">Send it to our team on WhatsApp to get matching property options.</p>
        <a href={done} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-md bg-success px-6 py-3 text-sm font-semibold text-primary-foreground">Send on WhatsApp</a>
        <button onClick={() => setDone(null)} className="mt-3 block w-full text-sm text-muted-foreground underline">Edit requirement</button>
      </div>
    );
  }

  const Err = ({ n }: { n: string }) => (errors[n] ? <p className="mt-1 text-xs text-destructive">{errors[n]}</p> : null);
  const label = "mb-1.5 block text-xs font-semibold";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-lg border bg-card p-6 shadow-card sm:grid-cols-2 md:p-8">
      <div><label className={label} htmlFor="name">Name *</label><input id="name" name="name" className="field" /><Err n="name" /></div>
      <div><label className={label} htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" className="field" /><Err n="phone" /></div>
      <div><label className={label} htmlFor="whatsapp">WhatsApp Number</label><input id="whatsapp" name="whatsapp" type="tel" className="field" /></div>
      <div><label className={label} htmlFor="email">Email (optional)</label><input id="email" name="email" type="email" className="field" /><Err n="email" /></div>
      <div><label className={label} htmlFor="requirement">Requirement *</label>
        <select id="requirement" name="requirement" className="field" defaultValue="Buy"><option>Buy</option><option>Sell</option><option>Rent / Lease</option></select></div>
      <div><label className={label} htmlFor="propertyType">Property Type *</label>
        <select id="propertyType" name="propertyType" className="field" defaultValue=""><option value="" disabled>Select</option>{PROPERTY_TYPES.map((t) => <option key={t.slug}>{t.label}</option>)}</select><Err n="propertyType" /></div>
      <div><label className={label} htmlFor="location">Preferred Location</label>
        <select id="location" name="location" className="field" defaultValue="">{[<option key="" value="">Any</option>, ...LOCATIONS.map((l) => <option key={l.slug}>{l.name}</option>), <option key="o">Other Areas</option>]}</select></div>
      <div><label className={label} htmlFor="area">Required Area</label><input id="area" name="area" placeholder="e.g. 2,000 sq m" className="field" /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="budget">Budget</label><input id="budget" name="budget" placeholder="Optional" className="field" /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="message">Message</label><textarea id="message" name="message" rows={3} className="field" /></div>
      <button type="submit" className="rounded-md bg-graphite py-3.5 text-sm font-semibold text-graphite-foreground hover:bg-steel sm:col-span-2">Submit Requirement</button>
    </form>
  );
}
