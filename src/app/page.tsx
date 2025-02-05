// app/page.tsx
import { Container } from "./components/ui/container";
import { SVGContainer } from "./components/svg/svg-layout";
import Navigation from "./components/navigation";
import Exhibition from "./components/exhibition";

export default function Home() {
  return (
    <main className="bg-stone-300">
      <SVGContainer />
      <Navigation />
      <Container>
        <Exhibition />
        <Exhibition />
        <Exhibition />
      </Container>
    </main>
  );
}
