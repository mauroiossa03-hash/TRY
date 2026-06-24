import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import ApproachSection from "../components/ApproachSection";
import EngineLog from "../components/EngineLog";
import VideoDivider from "../components/VideoDivider";
import Performance from "../components/Performance";
import Pricing from "../components/Pricing";
import JoinCTA from "../components/JoinCTA";
import { useDocTitle } from "../lib/useDocTitle";

export default function Home() {
  useDocTitle("SPINEDGE — Quant Signals for Table Tennis");

  return (
    <>
      <Hero />
      <ServiceSection />
      <ApproachSection />
      <EngineLog />
      <VideoDivider />
      <Performance />
      <Pricing />
      <JoinCTA />
    </>
  );
}
