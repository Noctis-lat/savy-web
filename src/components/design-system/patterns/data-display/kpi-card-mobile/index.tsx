import type { LucideIcon } from "lucide-react";
import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type KpiCardMobileProps = {
	/** Lowercase plural noun for the counted entity, rendered after the count (e.g. "bancos"). */
	totalLabel: string;
	total: number;
	/** Amounts in cents, as returned by the API. */
	liquidity: number;
	debt: number;
	netWorth: number;
	totalIcon?: LucideIcon;
	currency?: string;
	locale?: string;
	className?: string;
};

export const KpiCardMobile = ({
	totalLabel,
	total,
	liquidity,
	debt,
	netWorth,
	totalIcon: TotalIcon,
	currency,
	locale,
	className,
}: KpiCardMobileProps): React.ReactElement => {
	const positiveLiquidity = Math.max(liquidity, 0);
	const absoluteDebt = Math.abs(debt);
	const exposure = positiveLiquidity + absoluteDebt;

	const liquidityShare = exposure > 0 ? (positiveLiquidity / exposure) * 100 : 0;
	const debtShare = exposure > 0 ? 100 - liquidityShare : 0;
	const isNegativeNetWorth = netWorth < 0;

	const format = (amount: number): string => formatCurrency(amount, currency, locale);

	return (
		<GlassCard
			variant="light"
			className={merge("gap-0 p-5", className)}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 flex-col gap-1">
					<span className="text-sm text-muted-foreground">Patrimonio neto</span>
					<span
						className={merge(
							"truncate text-3xl font-bold tracking-tight tabular-nums",
							isNegativeNetWorth ? "text-destructive" : "text-foreground",
						)}
					>
						{format(netWorth)}
					</span>
				</div>

				<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
					{TotalIcon && (
						<TotalIcon
							className="size-3.5"
							aria-hidden="true"
						/>
					)}
					<span className="tabular-nums">{total}</span>
					<span>{totalLabel}</span>
				</span>
			</div>

			<div
				role="img"
				aria-label={`Composición: liquidez ${Math.round(liquidityShare)}%, deuda ${Math.round(debtShare)}%`}
				className="mt-5 flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-foreground/5"
			>
				{liquidityShare > 0 && (
					<div
						className="h-full rounded-full bg-primary"
						style={{ width: `${liquidityShare}%` }}
					/>
				)}
				{debtShare > 0 && (
					<div
						className="h-full rounded-full bg-destructive/70"
						style={{ width: `${debtShare}%` }}
					/>
				)}
			</div>

			<dl className="mt-4 grid grid-cols-2 gap-3">
				<div className="flex min-w-0 flex-col gap-1">
					<dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<span
							className="size-2 shrink-0 rounded-full bg-primary"
							aria-hidden="true"
						/>
						Liquidez
					</dt>
					<dd className="truncate text-base font-semibold tabular-nums text-foreground">
						{format(liquidity)}
					</dd>
				</div>

				<div className="flex min-w-0 flex-col gap-1">
					<dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<span
							className="size-2 shrink-0 rounded-full bg-destructive/70"
							aria-hidden="true"
						/>
						Deuda
					</dt>
					<dd className="truncate text-base font-semibold tabular-nums text-foreground">
						{format(absoluteDebt)}
					</dd>
				</div>
			</dl>
		</GlassCard>
	);
};
