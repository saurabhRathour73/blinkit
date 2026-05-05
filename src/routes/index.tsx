import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturesBox from "@/components/sections/FeaturesBox";
import Transport from "@/components/sections/Transport";
import BlinkitShowcase from "@/components/sections/BlinkitShowcase.tsx";
import GlobeMap from "@/components/sections/GlobeMap";
import TruckSection from "@/components/sections/TruckSection";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Blinkit — Instant Delivery, reimagined" },
      { name: "description", content: "Cinematic look at Blinkit's instant delivery network: drones, smart boxes, electric fleet and 10-minute promise." },
      { property: "og:title", content: "Blinkit — Instant Delivery, reimagined" },
      { property: "og:description", content: "Drones, smart boxes, an electric fleet — and a 10-minute promise." },
    ],
  }),
});

function Index() {
  useLenis();
  return (
    <main className="grain bg-cream text-deep">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <FeaturesBox />
      <Transport />
      <BlinkitShowcase/>
      <GlobeMap />
      <TruckSection />
      <CTA />
      <Footer />
    </main>
  );
}
