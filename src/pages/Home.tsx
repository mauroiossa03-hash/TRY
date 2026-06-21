import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import ApproachSection from "../components/ApproachSection";
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
      <VideoDivider />
      <StrategyMatrix />
      <Performance />
      <Pricing />
    </>
  );
}
