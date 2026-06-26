import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import EngineLog from "../components/EngineLog";
import VideoDivider from "../components/VideoDivider";
import Performance from "../components/Performance";
import Pricing from "../components/Pricing";
import JoinCTA from "../components/JoinCTA";
import { useDocTitle } from "../lib/useDocTitle";

export default function Home() {
  useDocTitle("Quantitative Betting — Data-Driven Table Tennis Signals");

  return (
    <>
      <Hero />
      <ServiceSection />
      <EngineLog />
      <VideoDivider />
      <Performance />
      <Pricing />
      <JoinCTA />
    </>
  );
}
