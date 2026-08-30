import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { SERVICE_BENEFITS } from "@/lib/constants/benefits";

/**
 * Four compact items sitting naturally in the composition — the reference
 * does not place them in cards.
 */
export function ServiceBenefits() {
  return (
    <section className="benefits" aria-label="Why book with Easy Trav">
      <Container>
        <ul className="benefits__grid">
          {SERVICE_BENEFITS.map((benefit) => (
            <li key={benefit.title} className="benefit">
              <Icon name={benefit.icon} size={26} className="benefit__icon" />
              <div>
                <p className="benefit__title">{benefit.title}</p>
                <p className="benefit__copy">{benefit.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
