import { CreditCardCheck } from "lucide-react";
import type React from "react";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type PayCreditCardSubmitProps = {
	amount: number;
	description: string;
	sourceAccountId: string;
	destinationAccountId: string;
	isDisabled: boolean;
	onSuccess?: () => void;
};

export const PayCreditCardSubmit = ({
	amount,
	description,
	sourceAccountId,
	destinationAccountId,
	isDisabled,
	onSuccess,
}: PayCreditCardSubmitProps): React.ReactElement => {
	const { mutate: createTransaction, isPending } = useCreateTransaction();

	const handleSubmit = (): void => {
		createTransaction(
			{
				accountId: sourceAccountId,
				type: "PAYMENT",
				amount,
				destinationAccountId,
				description: description || undefined,
			},
			{
				onSuccess: () => {
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={handleSubmit}
			disabled={isDisabled || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Pagando...
				</>
			) : (
				<>
					<CreditCardCheck className="size-4" />
					Pagar {formatCurrency(amount)}
				</>
			)}
		</Button>
	);
};
