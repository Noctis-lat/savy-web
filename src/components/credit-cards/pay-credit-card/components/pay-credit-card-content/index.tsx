import { ArrowDown, ArrowRight, Check, Edit3 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Input } from "@/components/ui/input";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryPendingCardStatement } from "@/hooks/card-statements/useQueryPendingCardStatement";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { formatShortDate } from "@/utils/formatters/formatDate";
import { parseCurrencyToCents } from "@/utils/formatters/parseCurrencyToCents";
import { merge } from "@/utils/ui/mergeStyles";
import { PayAccountCard } from "./components/pay-account-card";

type AmountMode = "min" | "noInterest" | "custom";

type PayCreditCardContentProps = {
	creditCard: CreditCard;
	onAmountChange: (amount: number) => void;
	onDescriptionChange: (description: string) => void;
};

const AMOUNT_MODE_LABELS: Record<AmountMode, string> = {
	min: "Pago mínimo",
	noInterest: "Sin intereses",
	custom: "Otro monto",
};

export const PayCreditCardContent = ({
	creditCard,
	onAmountChange,
	onDescriptionChange,
}: PayCreditCardContentProps): React.ReactElement => {
	const { pendingStatement, isLoading: isLoadingStatement } = useQueryPendingCardStatement(
		creditCard.id,
	);
	const { account: sourceAccount, isLoading: isLoadingSource } = useQueryAccount(
		creditCard.paymentAccountId ?? undefined,
	);

	const hasPendingStatement = pendingStatement !== undefined;

	const [amountMode, setAmountMode] = useState<AmountMode>(
		hasPendingStatement ? "noInterest" : "custom",
	);
	const [customAmountDisplay, setCustomAmountDisplay] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
	const [draftDescription, setDraftDescription] = useState<string>("");

	// Sync amount when mode or pending statement changes
	useEffect(() => {
		if (!hasPendingStatement) {
			if (amountMode !== "custom") setAmountMode("custom");
			return;
		}
		if (amountMode === "min") {
			onAmountChange(pendingStatement.minPayment);
		} else if (amountMode === "noInterest") {
			onAmountChange(pendingStatement.noInterestPayment);
		}
	}, [amountMode, hasPendingStatement, pendingStatement, onAmountChange]);

	// Sync default description when pending statement loads
	useEffect(() => {
		if (!pendingStatement) {
			setDescription(`Pago de tarjeta ${creditCard.name}`);
			return;
		}
		setDescription(
			`Pago del periodo ${formatShortDate(pendingStatement.periodStart)} - ${formatShortDate(pendingStatement.periodEnd)}`,
		);
	}, [pendingStatement, creditCard.name]);

	// Propagate description up
	useEffect(() => {
		onDescriptionChange(description);
	}, [description, onDescriptionChange]);

	const currentAmount =
		amountMode === "min"
			? (pendingStatement?.minPayment ?? 0)
			: amountMode === "noInterest"
				? (pendingStatement?.noInterestPayment ?? 0)
				: parseCurrencyToCents(customAmountDisplay);

	const handleModeChange = (mode: AmountMode): void => {
		if (!hasPendingStatement && mode !== "custom") return;
		setAmountMode(mode);
		if (mode === "custom") {
			onAmountChange(parseCurrencyToCents(customAmountDisplay));
		}
	};

	const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const display = event.target.value;
		setCustomAmountDisplay(display);
		onAmountChange(parseCurrencyToCents(display));
	};

	const handleDescriptionConfirm = (): void => {
		setDescription(draftDescription.trim() || description);
		setIsEditingDescription(false);
	};

	const handleDescriptionKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleDescriptionConfirm();
		}
	};

	const handleEditDescription = (): void => {
		setDraftDescription(description);
		setIsEditingDescription(true);
	};

	const cardColor = creditCard.color ?? PRIMARY_FALLBACK;
	const sourceColor = sourceAccount?.color ?? PRIMARY_FALLBACK;

	if (isLoadingStatement || isLoadingSource) {
		return (
			<div className="flex items-center justify-center py-8">
				<Spinner size={24} />
			</div>
		);
	}

	if (!creditCard.paymentAccountId) {
		return (
			<p className="py-6 text-center text-sm text-muted-foreground">
				Sin cuenta de pago configurada
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			{/* Accounts side by side */}
			<div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
				<PayAccountCard
					name={sourceAccount?.name ?? "Cuenta de pago"}
					color={sourceColor}
					icon={sourceAccount?.icon ?? null}
					label="Saldo disponible"
					value={formatCurrency(sourceAccount?.balance ?? 0)}
					className="flex-1"
				/>

				<div className="flex shrink-0 items-center justify-center py-1 sm:py-0">
					<ArrowRight
						className="size-5 text-muted-foreground sm:block hidden"
						aria-hidden="true"
					/>
					<ArrowDown
						className="size-5 text-muted-foreground sm:hidden"
						aria-hidden="true"
					/>
				</div>

				<PayAccountCard
					name={creditCard.name}
					color={cardColor}
					icon={creditCard.icon}
					label="Deuda actual"
					value={formatCurrency(creditCard.currentBalance)}
					valueTone={creditCard.currentBalance > 0 ? "danger" : "default"}
					className="flex-1"
				/>
			</div>

			{/* Amount selector */}
			<div className="flex flex-col gap-3">
				<div className="flex gap-2">
					{(Object.keys(AMOUNT_MODE_LABELS) as AmountMode[]).map((mode) => {
						const isDisabled = !hasPendingStatement && mode !== "custom";
						const isActive = amountMode === mode;
						return (
							<button
								key={mode}
								type="button"
								disabled={isDisabled}
								onClick={() => handleModeChange(mode)}
								className={merge(
									"flex-1 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition-colors",
									isActive
										? "bg-primary text-primary-foreground"
										: "bg-muted text-muted-foreground hover:bg-muted/80",
									isDisabled && "cursor-not-allowed opacity-50",
								)}
							>
								{AMOUNT_MODE_LABELS[mode]}
							</button>
						);
					})}
				</div>

				{amountMode === "custom" && (
					<div className="relative">
						<span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground">
							$
						</span>
						<Input
							type="text"
							inputMode="decimal"
							placeholder="0.00"
							value={customAmountDisplay}
							onChange={handleCustomAmountChange}
							className="pl-7 border border-gray-200!"
						/>
					</div>
				)}

				<p className="text-sm text-muted-foreground tabular-nums">
					Vas a pagar{" "}
					<span className="font-medium text-foreground">{formatCurrency(currentAmount)}</span>
				</p>
			</div>

			{/* Description */}
			<div className="flex items-center gap-2">
				{isEditingDescription ? (
					<>
						<Input
							type="text"
							value={draftDescription}
							onChange={(event) => setDraftDescription(event.target.value)}
							onKeyDown={handleDescriptionKeyDown}
							className="flex-1"
							aria-label="Descripción del pago"
						/>
						<button
							type="button"
							onClick={handleDescriptionConfirm}
							className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
							aria-label="Confirmar descripción"
						>
							<Check className="size-4" />
						</button>
					</>
				) : (
					<>
						<span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
							{description}
						</span>
						<button
							type="button"
							onClick={handleEditDescription}
							className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
							aria-label="Editar descripción"
						>
							<Edit3 className="size-3.5" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};
