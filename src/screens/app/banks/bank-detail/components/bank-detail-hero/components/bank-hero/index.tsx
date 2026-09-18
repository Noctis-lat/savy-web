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
	return (
		<ScaleFadeIn>
			<GlassCard className="p-6">
				<div className="flex items-center gap-2">
					<span
						className="size-3 shrink-0 rounded-full"
						style={{ backgroundColor: bank.color ?? PRIMARY_FALLBACK }}
					/>
					<h2 className="text-lg font-semibold text-foreground">{bank.name}</h2>
					{!bank.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}

					<div className="ml-auto flex items-center gap-6 divide-x divide-border/30">
						<div className="flex flex-col gap-0.5 pr-6">
							<span className="text-xs text-muted-foreground">Patrimonio</span>
							<span className="text-xl font-bold tabular-nums text-foreground">
								{formatCurrency(bank.info.netWorth, currency, locale)}
							</span>
						</div>
						<div className="flex flex-col gap-0.5 px-6">
							<span className="text-xs text-muted-foreground">Liquidez</span>
							<span className="text-base font-semibold tabular-nums text-foreground">
								{formatCurrency(bank.info.liquidity, currency, locale)}
							</span>
						</div>
						<div className="flex flex-col gap-0.5 pl-6">
							<span className="text-xs text-muted-foreground">Deuda</span>
							<span
								className={merge(
									"text-base font-semibold tabular-nums",
									bank.info.debt > 0 ? "text-destructive" : "text-foreground",
								)}
							>
								{formatCurrency(bank.info.debt, currency, locale)}
							</span>
						</div>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
