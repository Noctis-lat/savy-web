import { CalendarDays, Landmark } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { INCOME_DESTINATION_ACCOUNT_PARAMS } from "@/content/income-sources/incomeSourceContent";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatIncomePaydays } from "@/utils/income-sources/formatIncomePaydays";
import { getFrequencyLabel } from "@/utils/onboarding/getFrequencyLabel";
import { merge } from "@/utils/ui/mergeStyles";
import { EditIncomeSource } from "./components/edit-income-source";
import { RemoveIncomeSource } from "./components/remove-income-source";

type IncomeSourceItemProps = {
	incomeSource: IncomeSource;
	isEditing: boolean;
};

export const IncomeSourceItem = ({
	incomeSource,
	isEditing,
}: IncomeSourceItemProps): React.ReactElement => {
	const { accounts } = useQueryAccounts(INCOME_DESTINATION_ACCOUNT_PARAMS);

	const destinationAccountName =
		accounts?.find((account) => account.id === incomeSource.destinationAccountId)?.name ??
		"Cuenta no encontrada";

	return (
		<ScaleFadeIn className="h-full">
			<GlassCard className="relative flex h-full min-h-36 flex-col gap-3 p-4">
				<div className="flex flex-row items-start justify-between gap-2">
					<h3 className="text-sm font-medium text-foreground select-none wrap-break-word">
						{incomeSource.name}
					</h3>
					<div className="flex shrink-0 flex-row items-center gap-1">
						{!incomeSource.isActive && (
							<Badge
								variant="outline"
								className="px-3 text-xs text-muted-foreground"
							>
								Inactiva
							</Badge>
						)}
						<Badge
							variant="outline"
							className="border-primary/20 bg-primary/10 px-3 text-xs text-primary"
						>
							{getFrequencyLabel(incomeSource.frequency)}
						</Badge>
					</div>
				</div>

				<p
					className={merge(
						"text-lg font-semibold tabular-nums text-foreground",
						!incomeSource.isActive && "opacity-50",
					)}
				>
					{formatCurrency(incomeSource.amount)}
				</p>

				<div className="flex flex-col gap-1 text-xs text-muted-foreground">
					<span className="flex flex-row items-center gap-1.5">
						<CalendarDays className="size-3.5 shrink-0" />
						{formatIncomePaydays(incomeSource.frequency, incomeSource.paydays)}
					</span>
					<span className="flex flex-row items-center gap-1.5">
						<Landmark className="size-3.5 shrink-0" />
						{destinationAccountName}
					</span>
				</div>

				{isEditing && (
					<>
						<EditIncomeSource incomeSource={incomeSource} />
						<RemoveIncomeSource incomeSource={incomeSource} />
					</>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
