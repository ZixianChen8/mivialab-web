import { STUDIO_EMAIL } from "@/lib/mail";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  underline?: boolean;
};

export const FOOTER_STATEMENT = ["WEB DESIGN", "& DEVELOPMENT", "STUDIO."];

export const FOOTER_SOCIAL: FooterLink[] = [
  { label: "LinkedIn", href: "#", external: true },
];

export const FOOTER_ADDRESS = ["Ottawa–Toronto", "Canada"];

export const FOOTER_CONTACT_LINKS: FooterLink[] = [
  { label: STUDIO_EMAIL, href: `mailto:${STUDIO_EMAIL}`, underline: true },
  { label: "Contact", href: "#contact", underline: true },
  { label: "About", href: "/about", underline: true },
];

export const FOOTER_WORDMARK = "mivialab";
