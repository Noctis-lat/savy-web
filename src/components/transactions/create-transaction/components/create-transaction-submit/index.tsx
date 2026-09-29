import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import type { CreateTransactionFormValues } from "@/schemas/transactions/createTransactionSchema";

type CreateTransactionSubmitProps = {
	onSuccess?: () => void;
};

export const CreateTransactionSubmit = ({
	onSuccess,
}: CreateTransactionSubmitProps): React.ReactElement => {
	const createTransactionForm = useFormContext<CreateTransactionFormValues>();
	const { mutate: createTransaction, isPending } = useCreateTransaction();

	const onSubmit = (transactionData: CreateTransactionFormValues): void => {
		createTransaction(transactionData, {
			onSuccess: () => {
				createTransactionForm.reset();
				onSuccess?.();
			},
		});
	};

	return (
		<Button
			type="button"
			onClick={createTransactionForm.handleSubmit(onSubmit)}
			disabled={!createTransactionForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar transacción
				</>
			)}
		</Button>
	);
};
