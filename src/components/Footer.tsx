import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {siteConfig.legalName}. {siteConfig.domain}
        </p>
        <p>Based in Calgary. Web development for startups &amp; SMBs.</p>
      </div>
    </footer>
  );
}
