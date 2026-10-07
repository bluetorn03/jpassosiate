import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ContactBlock } from "@/components/site/Sections";
import { RequirementForm } from "@/components/site/RequirementForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact JP Associate — S-30 RIICO Khushkhera" },
      { name: "description", content: "Call +91 77372 10073 or WhatsApp JP Associate for industrial property in Bhiwadi and Khushkhera. Open 8 AM – 10 PM." },
      { property: "og:title", content: "Contact JP Associate" },
      { property: "og:description", content: "Call or WhatsApp for industrial property in Bhiwadi and Khushkhera." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to JP Associate" intro="Call, WhatsApp or send your property requirement." />
      <section className="container-x py-12"><ContactBlock /></section>
      <section id="requirement" className="container-x scroll-mt-20 grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div><h2 className="text-3xl font-extrabold">Looking for a Specific Industrial Property?</h2><p className="mt-3 text-muted-foreground">Tell us what you need and our team can help you explore suitable options.</p></div>
        <RequirementForm />
      </section>
    </>
  );
}
