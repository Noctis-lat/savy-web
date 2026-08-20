import { HandCoins, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { Button } from "@/components/ui/button";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatPaydays } from "@/utils/onboarding/formatPaydays";
import { getFrequencyLabel } from "@/utils/onboarding/getFrequencyLabel";

type DraftListProps = {
	emptyHint?: string;
	readOnly?: boolean;
};

export const DraftList = ({
	emptyHint = "Agrega al menos una fuente de ingresos para continuar.",
	readOnly = false,
}: DraftListProps): React.ReactElement => {
	const drafts = useOnboardingController((state) => state.incomeSourceDrafts);
	const removeDraft = useOnboardingController((state) => state.removeDraft);
	const createdAccounts = useOnboardingController((state) => state.createdAccounts);

	const accountNameById = new Map(createdAccounts.map((account) => [account.id, account.name]));

	if (drafts.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-6 text-center">
				<Plus className="size-5 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">{emptyHint}</p>
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-2">
			{drafts.map((draft, index) => {
				const draftKey = `${draft.name}-${draft.amount}-${draft.paydays.join("-")}-${index}`;
				return (
					<li key={draftKey}>
						<InfoItem
							icon={HandCoins}
							title={draft.name}
							description={`${formatCurrency(draft.amount)} · ${getFrequencyLabel(draft.frequency)} · ${formatPaydays(draft.paydays)} → ${accountNameById.get(draft.destinationAccountId) ?? "Cuenta"}`}
							action={
								!readOnly ? (
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										className="text-muted-foreground hover:text-destructive"
										onClick={() => removeDraft(index)}
										aria-label={`Eliminar ${draft.name}`}
									>
										<Trash2 className="size-3.5" />
									</Button>
								) : undefined
							}
						/>
					</li>
				);
			})}
		</ul>
	);
};
