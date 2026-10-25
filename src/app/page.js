import CinematicHero from "@/components/home/bannar/CinematicHero";
import ProgramSearch from "@/components/home/programSearch/ProgramSearch";
import { getAvailability } from "@/lib/programs";



export default function Home() {
  return (
    <main>
   
  <CinematicHero /> 
 <ProgramSearch availability={getAvailability()} />
     
    </main>
  );
}
