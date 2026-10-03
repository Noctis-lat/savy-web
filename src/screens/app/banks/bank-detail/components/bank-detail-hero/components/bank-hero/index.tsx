import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type BankHeroProps = {
	bank: Bank;
	currency: string;
	locale: string;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const BankHero = ({ bank, currency, locale }: BankHeroProps): React.ReactElement => {
	const netWorth = formatCurrency(bank?.info?.netWorth ?? 0, currency, locale);

	return (
		<ScaleFadeIn>
			<GlassCard className="p-5 sm:p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
					<div className="flex min-w-0 items-center justify-between gap-3">
						<div className="flex min-w-0 items-center gap-2">
							<span
								className="size-3 shrink-0 rounded-full"
								style={{ backgroundColor: bank.color ?? PRIMARY_FALLBACK }}
							/>
							<h2 className="truncate text-lg font-semibold text-foreground">{bank.name}</h2>
							{!bank.isActive && (
								<span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
									Inactivo
								</span>
							)}
						</div>

						{/* Mobile only: net worth shares the row with the bank name */}
						<div className="flex shrink-0 flex-col items-end gap-0.5 sm:hidden">
							<span className="text-xs text-muted-foreground">Patrimonio</span>
							<span className="text-xl font-bold tabular-nums text-foreground">{netWorth}</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/30 pt-4 sm:ml-auto sm:flex sm:items-center sm:gap-6 sm:divide-x sm:divide-border/30 sm:border-t-0 sm:pt-0">
						<div className="hidden min-w-0 flex-col gap-0.5 sm:flex sm:pr-6">
							<span className="text-xs text-muted-foreground">Patrimonio</span>
							<span className="truncate text-xl font-bold tabular-nums text-foreground">
								{netWorth}
							</span>
						</div>
						<div className="flex min-w-0 flex-col gap-0.5 sm:px-6">
							<span className="text-xs text-muted-foreground">Liquidez</span>
							<span className="text-base font-semibold tabular-nums text-foreground">
								{formatCurrency(bank.info?.liquidity ?? 0, currency, locale)}
							</span>
						</div>
						<div className="flex min-w-0 flex-col items-end gap-0.5 sm:items-start sm:pl-6">
							<span className="text-xs text-muted-foreground">Deuda</span>
							<span
								className={merge(
									"text-base font-semibold tabular-nums",
									bank?.info?.debt && bank?.info?.debt > 0 ? "text-destructive" : "text-foreground",
								)}
							>
								{formatCurrency(bank.info?.debt ?? 0, currency, locale)}
							</span>
						</div>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
