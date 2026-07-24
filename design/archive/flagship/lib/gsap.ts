/**
 * Central GSAP setup. Section components should import { gsap, ScrollTrigger }
 * from here so the plugin is registered exactly once and only on the client.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

/**
 * The studio signature ease. Mirrors the CSS cubic-bezier(0.16, 1, 0.3, 1)
 * token so GSAP-driven and CSS-driven motion match exactly.
 */
export const MIVIA_EASE = "mivia";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create(MIVIA_EASE, "M0,0 C0.16,1 0.3,1 1,1");
}

export { gsap, ScrollTrigger };
