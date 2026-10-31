import CinematicHero from "@/components/home/bannar/CinematicHero";
import ProgramSearch from "@/components/home/programSearch/ProgramSearch";
import { getAvailability } from "@/lib/programs";
import PopularDestinations from "@/components/home/destinations/PopularDestinations";
import HowItWorks from "@/components/home/howItWorks/HowItWorks";



export default function Home() {
  return (
    <main>

      <CinematicHero />
      <ProgramSearch availability={getAvailability()} />
      <PopularDestinations />
      <HowItWorks />

    </main>
  );
}
