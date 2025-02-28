import { SVGContainer } from "./components/svg/svg-layout";
import Exhibition from "./components/Exhibition";
import Navbar from "./components/layout/navbar";
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
