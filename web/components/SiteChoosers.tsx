import { FontChooser } from "@/components/FontChooser";
import { ThemeChooser } from "@/components/ThemeChooser";

export function SiteChoosers() {
  return (
    <div className="site-choosers">
      <FontChooser />
      <ThemeChooser />
    </div>
  );
}
