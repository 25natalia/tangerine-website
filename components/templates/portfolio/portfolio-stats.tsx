import { Container } from "@/components/ui/container";
import type { PortfolioStat } from "@/lib/templates/portfolio";

/**
 * Same stat-tile composition as Case Study's Impact section and the
 * Components catalog's CatalogStats — a value/label pair, not a new
 * registered "Stat" component. See either of those READMEs for why this
 * stays composition instead of a fourth reimplementation.
 */
export function PortfolioStats({ stats }: { stats: PortfolioStat[] }) {
  return (
    <div className="border-y border-(--border-subtle) bg-(--background-subtle)">
      <Container size="wide" className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-caption tracking-wide text-(--text-tertiary) uppercase">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-(--text-primary)">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
