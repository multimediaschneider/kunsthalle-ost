import { SVGContainer } from "./components/svg/svg-layout";
import Exhibition from "./components/exhibition";
import Navbar from "./components/ui/navbar";
import Gallery from "./components/gallery";
import Navigation from "./components/navigation";

export default function Home() {
  return (
    <main className="bg-stone-300">
      <Navbar />
      <SVGContainer />
      {/* <Navigation /> */}
      <Gallery />
      <Exhibition />
      <Navigation />
    </main>
  );
}
