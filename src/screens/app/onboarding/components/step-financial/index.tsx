import { ArrowLeft, ArrowRight, HandCoins, Loader2, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { InfoItem } from "@/components/design-system/primitives/info-item";
import { Button } from "@/components/ui/button";
import { useBulkCreateIncomeSources } from "@/hooks/income-sources/useBulkCreateIncomeSources";
import { useCreateIncomeSource } from "@/hooks/income-sources/useCreateIncomeSource";
import { useQueryIncomeSources } from "@/hooks/income-sources/useQueryIncomeSources";
import type { IncomeSourceFormValues } from "@/schemas/onboarding/incomeSourceSchema";
import { useOnboardingController } from "@/storage/onboarding/onboardingController";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatPaydays } from "@/utils/onboarding/formatPaydays";
import { getFrequencyLabel } from "@/utils/onboarding/getFrequencyLabel";
import { OnboardingProgress } from "../onboarding-progress";
import { DraftList } from "./components/draft-list";
import { IncomeSourceForm } from "./components/income-source-form";

type CreationError = { input: CreateIncomeSourcePayload; errors: string[] };

export const StepFinancial = (): React.ReactElement => {
	const nextStep = useOnboardingController((state) => state.nextStep);
	const prevStep = useOnboardingController((state) => state.prevStep);
	const drafts = useOnboardingController((state) => state.incomeSourceDrafts);
	const createdIncomeSources = useOnboardingController((state) => state.createdIncomeSources);
	const setCreatedIncomeSources = useOnboardingController((state) => state.setCreatedIncomeSources);
	const clearDrafts = useOnboardingController((state) => state.clearDrafts);
	const createdAccounts = useOnboardingController((state) => state.createdAccounts);

	const [showMiniForm, setShowMiniForm] = useState<boolean>(false);
	const [bulkErrors, setBulkErrors] = useState<CreationError[]>([]);

	const bulkCreate = useBulkCreateIncomeSources();
	const createIndividual = useCreateIncomeSource();

	const hasExisting = createdIncomeSources.length > 0;

	const queryAll = useQueryIncomeSources();
	const existingSources: IncomeSource[] = hasExisting
		? createdIncomeSources
		: (queryAll.data ?? []);

	const isPending = bulkCreate.isPending || createIndividual.isPending;

	const canContinue =
		!showMiniForm &&
		((hasExisting && existingSources.length > 0) || (!hasExisting && drafts.length > 0));

	const accountOptions: Option[] = createdAccounts.map((account) => ({
		label: account.name,
		value: account.id,
	}));

	const accountNameById = new Map(createdAccounts.map((account) => [account.id, account.name]));

	const handleContinue = async (): Promise<void> => {
		if (hasExisting) {
			nextStep();
			return;
		}

		if (drafts.length === 0) return;

		setBulkErrors([]);

		try {
			const result = await bulkCreate.mutateAsync({ sources: drafts });

			if (result.creationState === "success") {
				setCreatedIncomeSources(result.successful);
				clearDrafts();
				nextStep();
				return;
			}

			if (result.creationState === "partial") {
				setCreatedIncomeSources(result.successful);
				setBulkErrors(result.failed);
				const failedInputs = new Set(result.failed.map((failed) => JSON.stringify(failed.input)));
				const kept = drafts.filter((draft) => failedInputs.has(JSON.stringify(draft)));
				clearDrafts();
				for (const draft of kept) {
					useOnboardingController.getState().addDraft(draft);
				}
				return;
			}

			setBulkErrors(result.failed);
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	const handleDraftSave = (values: IncomeSourceFormValues): void => {
		useOnboardingController.getState().addDraft(values);
	};

	const handleExistingSave = async (values: IncomeSourceFormValues): Promise<void> => {
		try {
			const created = await createIndividual.mutateAsync(values);
			setCreatedIncomeSources([...createdIncomeSources, created]);
			setShowMiniForm(false);
		} catch {
			// onError in the mutation already toasts the error.
		}
	};

	return (
		<div className="flex w-full flex-col gap-6 sm:w-auto sm:flex-row sm:items-stretch sm:justify-center">
			{/* LEFT — principal card */}
			<GlassCard
				variant="light"
				className="relative flex w-full max-w-md flex-col gap-5 p-6 sm:p-8"
			>
				<OnboardingProgress />

				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold text-foreground">Información financiera</h2>
					<p className="text-sm text-muted-foreground">
						{hasExisting
							? "Agrega más fuentes de ingreso o continúa con las que ya creaste."
							: "Agrega al menos una fuente de ingresos para continuar."}
					</p>
				</div>

				{/* Existing sources (back-from-step-3) */}
				{hasExisting && existingSources.length > 0 && (
					<ul className="flex flex-col gap-2">
						{existingSources.map((source) => (
							<li key={source.id}>
								<InfoItem
									icon={HandCoins}
									label={source.name}
									value={`${formatCurrency(source.amount)} · ${getFrequencyLabel(source.frequency)} · ${formatPaydays(source.paydays)} → ${accountNameById.get(source.destinationAccountId) ?? "Cuenta no encontrada"}`}
								/>
							</li>
						))}
					</ul>
				)}

				{/* Draft list (fresh flow) */}
				{!hasExisting && <DraftList />}

				{/* Add button — hidden when mini-form is open */}
				{!showMiniForm && (
					<Button
						type="button"
						variant="outline"
						onClick={() => setShowMiniForm(true)}
						disabled={isPending}
					>
						<Plus className="size-4" />
						{drafts.length > 0 || hasExisting ? "Agregar otra fuente" : "Agregar fuente de ingreso"}
					</Button>
				)}

				{/* Bulk errors */}
				{bulkErrors.length > 0 && (
					<div className="flex flex-col gap-1 rounded-md border border-destructive/40 bg-destructive/10 p-3">
						<p className="text-xs font-medium text-destructive">Algunas fuentes no se crearon:</p>
						<ul className="flex flex-col gap-1">
							{bulkErrors.map((failed, index) => {
								const errorKey = `${failed.input.name}-${failed.input.amount}-${index}`;
								return (
									<li
										key={errorKey}
										className="text-xs text-destructive"
									>
										{failed.input.name}: {failed.errors.join(", ")}
									</li>
								);
							})}
						</ul>
					</div>
				)}

				{/* Navigation */}
				<div className="mt-auto flex flex-row gap-3 pt-2">
					<Button
						type="button"
						variant="outline"
						onClick={prevStep}
						disabled={isPending}
					>
						<ArrowLeft />
						Atrás
					</Button>
					<Button
						type="button"
						onClick={handleContinue}
						disabled={isPending || !canContinue}
						className="flex-1"
					>
						{isPending ? (
							<>
								<Loader2 className="animate-spin" />
								Guardando...
							</>
						) : (
							<>
								Continuar
								<ArrowRight />
							</>
						)}
					</Button>
				</div>
			</GlassCard>

			{/* RIGHT — mini-form card (hidden by default, appears on "Agregar") */}
			{showMiniForm && (
				<GlassCard
					variant="light"
					className="relative flex w-full flex-col p-6 sm:max-w-sm sm:p-8"
				>
					<IncomeSourceForm
						onSave={hasExisting ? handleExistingSave : handleDraftSave}
						onSaved={() => setShowMiniForm(false)}
						accountOptions={accountOptions}
					/>
				</GlassCard>
			)}
		</div>
	);
};
