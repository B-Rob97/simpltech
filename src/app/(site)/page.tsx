import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { ThemeComposition } from "@/components/ThemeComposition";

export default function Home() {
  return (
    <ThemeComposition hero={<Hero />} sections={{ work: <Work />, services: <Services />, approach: <Approach />, about: <About />, pricing: <Pricing />, contact: <Contact /> }} />
  );
}
