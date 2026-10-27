import { CalendarClock, Repeat } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { BILL_FREQUENCY_LABELS } from "@/content/bills/billsOptions";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatBillingDays } from "@/utils/recurring-expenses/formatBillingDays";

type BillHeaderProps = {
	service: RecurringExpense;
};

export const BillHeader = ({ service }: BillHeaderProps): React.ReactElement => {
	const billColor = service.color ?? PRIMARY_FALLBACK;

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${billColor} 12%, transparent) 0%, color-mix(in oklch, ${billColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<ScaleFadeIn>
			<GlassCard
				variant="light"
				className="overflow-hidden p-0"
			>
				<div
					className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
					style={gradientStyle}
				>
					<div className="flex min-w-0 flex-col gap-1.5">
						<div className="flex items-start gap-4">
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-full shadow-sm"
								style={{ backgroundColor: billColor }}
							>
								<DynamicIcon
									name={(service.icon ?? "receipt") as IconName}
									className="text-white"
									size={24}
									aria-hidden="true"
								/>
							</div>

							<div className="flex min-w-0 flex-col gap-1.5">
								<div className="flex flex-wrap items-center gap-2">
									<h1 className="text-xl font-semibold text-foreground">{service.name}</h1>
									<Badge variant={service.isActive ? "default" : "secondary"}>
										{service.isActive ? "Activo" : "Inactivo"}
									</Badge>
								</div>

								<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
									<span className="flex items-center gap-1.5">
										<Repeat
											className="size-4"
											aria-hidden="true"
										/>
										{BILL_FREQUENCY_LABELS[service.frequency]}
									</span>
									<span className="flex items-center gap-1.5">
										<CalendarClock
											className="size-4"
											aria-hidden="true"
										/>
										{formatBillingDays(service.frequency, service.billingDays)}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<span className="text-2xl font-bold tabular-nums text-foreground">
							{formatCurrency(service.amount)}
						</span>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
