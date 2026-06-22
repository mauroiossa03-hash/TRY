import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import ApproachSection from "../components/ApproachSection";
import EngineLog from "../components/EngineLog";
import VideoDivider from "../components/VideoDivider";
import StrategyMatrix from "../components/StrategyMatrix";
import Performance from "../components/Performance";
import Pricing from "../components/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <ApproachSection />
      <EngineLog />
      <VideoDivider />
      <StrategyMatrix />
      <Performance />
      <Pricing />
    </>
  );
}
