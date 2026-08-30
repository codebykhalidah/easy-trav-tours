import { HeroConciergeCard } from "@/components/hero/HeroConciergeCard";
import { HeroContent } from "@/components/hero/HeroContent";
import { HeroMedia } from "@/components/hero/HeroMedia";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="hero">
      <HeroMedia />

      <Container className="hero__stage">
        <HeroContent />
        <HeroConciergeCard />
      </Container>
    </section>
  );
}
