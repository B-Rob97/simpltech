import { SkylineBand } from "@/components/CityNight";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] overflow-hidden pt-20 pb-10">
      <SkylineBand id="footer" compact className="opacity-45" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {siteConfig.legalName}. {siteConfig.domain}
        </p>
        <p>Based in Calgary. Web development for startups &amp; SMBs.</p>
      </div>
    </footer>
  );
}
