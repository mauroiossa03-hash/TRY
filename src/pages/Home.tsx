import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import EngineLog from "../components/EngineLog";
import Performance from "../components/Performance";
import Pricing from "../components/Pricing";
import { useDocTitle } from "../lib/useDocTitle";

export default function Home() {
  useDocTitle("Quantitative Betting — Segnali di scommesse sul tennistavolo");

  return (
    <>
      <Hero />
      <ServiceSection />
      <EngineLog />
      <Performance />
      <Pricing />
    </>
  );
}
