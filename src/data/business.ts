// Verified business information. Edit here only — UI reads from this object.
export const BUSINESS = {
  name: "JP Associate",
  altName: "JP Properties & Consultant",
  consultant: "Sachin Yadav",
  category: "Industrial Real Estate Agency",
  address: { line1: "S-30, RIICO", locality: "Khushkhera", region: "Rajasthan", postalCode: "301018", country: "India" },
  phoneDisplay: "+91 77372 10073",
  phoneE164: "+917737210073",
  // Uses the verified business phone. Confirm it is WhatsApp-enabled before launch.
  whatsapp: "917737210073",
  hours: "8:00 AM – 10:00 PM",
  rating: 4.7,
  reviewCount: 14,
  googleUrl: "https://www.google.com/maps/search/?api=1&query=JP+Associate+S-30+RIICO+Khushkhera+Rajasthan+301018",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=S-30+RIICO+Khushkhera+Rajasthan+301018",
  mapEmbed: "https://www.google.com/maps?q=S-30+RIICO+Khushkhera+Rajasthan+301018&output=embed",
  website: "https://www.jpproperty.co.in/",
} as const;

export const fullAddress = `${BUSINESS.address.line1}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}, ${BUSINESS.address.country}`;

export function waLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const telLink = `tel:${BUSINESS.phoneE164}`;
