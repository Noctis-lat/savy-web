import { Save } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { useCreateCreditCard } from "@/hooks/credit-cards/useCreateCreditCard";
import { useCreateLoan } from "@/hooks/loans/useCreateLoan";
import { useCreateSavingsGoal } from "@/hooks/savings-goals/useCreateSavingsGoal";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";
import { buildAccountPayload } from "@/utils/accounts/buildAccountPayload";
import { buildCreditCardPayload } from "@/utils/accounts/buildCreditCardPayload";
import { buildLoanPayload } from "@/utils/accounts/buildLoanPayload";
import { buildSavingsGoalPayload } from "@/utils/accounts/buildSavingsGoalPayload";

type CreateAccountSubmitProps = {
	onSuccess?: () => void;
};

export const CreateAccountSubmit = ({
	onSuccess,
}: CreateAccountSubmitProps): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();
	const { mutate: createCreditCard, isPending: isCreatingCreditCard } = useCreateCreditCard();
	const { mutate: createLoan, isPending: isCreatingLoan } = useCreateLoan();
	const { mutate: createSavingsGoal, isPending: isCreatingSavingsGoal } = useCreateSavingsGoal();
	// Rollback errors get an explicit toast below instead of the generic delete toast.
	const { mutate: deleteAccount, isPending: isRollingBack } = useDeleteAccount({
		showErrorToast: false,
	});

	const isPending =
		isSubmitting ||
		isCreatingAccount ||
		isCreatingCreditCard ||
		isCreatingLoan ||
		isCreatingSavingsGoal ||
		isRollingBack;

	const completeSubmit = (): void => {
		setIsSubmitting(false);
		createAccountForm.reset();
		onSuccess?.();
	};

	// The entity hook already toasted its own error; only surface the rollback if it fails too.
	const rollbackAccount = (newAccount: Account): void => {
		deleteAccount(newAccount.id, {
			onError: () => {
				toast.error(
					`La cuenta "${newAccount.name}" se creó incompleta. Elimínala y vuelve a intentarlo.`,
				);
			},
			onSettled: () => setIsSubmitting(false),
		});
	};

	const onSubmit = (accountValues: CreateAccountFormValues): void => {
		setIsSubmitting(true);

		createAccount(buildAccountPayload(accountValues), {
			onSuccess: (newAccount) => {
				if (accountValues.type === "DEBIT" || accountValues.type === "CASH") {
					completeSubmit();
					return;
				}

				// The account already exists here: a payload that cannot be built must roll it back.
				let creditCardPayload: CreateCreditCardPayload | undefined;
				let loanPayload: CreateLoanPayload | undefined;
				let savingsGoalPayload: CreateSavingsGoalPayload | undefined;
				try {
					if (accountValues.type === "CREDIT") {
						creditCardPayload = buildCreditCardPayload(newAccount.id, accountValues);
					} else if (accountValues.type === "LOAN") {
						loanPayload = buildLoanPayload(newAccount.id, accountValues);
					} else {
						savingsGoalPayload = buildSavingsGoalPayload(newAccount.id, accountValues);
					}
				} catch {
					toast.error("No se pudieron preparar los datos de la cuenta. Revisa el formulario.");
					rollbackAccount(newAccount);
					return;
				}

				if (creditCardPayload) {
					createCreditCard(creditCardPayload, {
						onSuccess: completeSubmit,
						onError: () => rollbackAccount(newAccount),
					});
					return;
				}

				if (loanPayload) {
					createLoan(loanPayload, {
						onSuccess: completeSubmit,
						onError: () => rollbackAccount(newAccount),
					});
					return;
				}

				if (savingsGoalPayload) {
					createSavingsGoal(savingsGoalPayload, {
						onSuccess: completeSubmit,
						onError: () => rollbackAccount(newAccount),
					});
				}
			},
			onError: () => setIsSubmitting(false),
		});
	};

	return (
		<Button
			type="button"
			onClick={createAccountForm.handleSubmit(onSubmit)}
			disabled={!createAccountForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cuenta
				</>
			)}
		</Button>
	);
};
