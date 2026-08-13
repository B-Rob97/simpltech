import { BrandMorphProvider } from "@/components/BrandMorphContext";
import { NightBackdrop } from "@/components/CityNight";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <BrandMorphProvider>
        <JsonLd />
        <ScrollProgress />
        <NightBackdrop />
        <Header />
        <main className="relative z-[1] flex-1">{children}</main>
        <Footer />
      </BrandMorphProvider>
    </SmoothScroll>
  );
}
