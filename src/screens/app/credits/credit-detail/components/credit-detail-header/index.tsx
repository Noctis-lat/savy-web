import { Dot } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { CreditHeaderSummary } from "./components/credit-header-summary";

type CreditDetailHeaderProps = {
	creditCard: CreditCard;
};

export const CreditDetailHeader = ({ creditCard }: CreditDetailHeaderProps): React.ReactElement => {
	const cardColor = creditCard.color ?? PRIMARY_FALLBACK;

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${cardColor} 12%, transparent) 0%, color-mix(in oklch, ${cardColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard className="overflow-hidden p-0 border-none">
				<div
					className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-6"
					style={gradientStyle}
				>
					<div className="flex min-w-0 flex-1 flex-row items-center gap-4">
						<div
							className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
							style={{ backgroundColor: cardColor }}
						>
							<DynamicIcon
								name={(creditCard.icon ?? "credit-card") as IconName}
								className="text-white"
								size={24}
							/>
						</div>

						<div className="flex min-w-0 flex-col gap-1">
							<h1 className="truncate text-lg font-semibold text-foreground">{creditCard.name}</h1>
							<div className="flex flex-wrap items-center text-xs text-muted-foreground tabular-nums">
								<span>Corte día {creditCard.cutDay}</span>
								<Dot aria-hidden="true" />
								<span>Próximo corte {formatShortDate(creditCard.currentCycleCutDate)}</span>
								{creditCard.paymentAccount && (
									<>
										<Dot aria-hidden="true" />
										<span className="truncate">Paga con {creditCard.paymentAccount.name}</span>
									</>
								)}
							</div>
						</div>
					</div>

					<CreditHeaderSummary creditCard={creditCard} />
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
