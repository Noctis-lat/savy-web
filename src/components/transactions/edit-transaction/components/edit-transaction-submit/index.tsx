import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateTransaction } from "@/hooks/transactions/useUpdateTransaction";
import type { UpdateTransactionFormValues } from "@/schemas/transactions/updateTransactionSchema";

type EditTransactionSubmitProps = {
	transactionId: string;
	onSuccess?: () => void;
};

export const EditTransactionSubmit = ({
	transactionId,
	onSuccess,
}: EditTransactionSubmitProps): React.ReactElement => {
	const editTransactionForm = useFormContext<UpdateTransactionFormValues>();
	const { mutate: updateTransaction, isPending } = useUpdateTransaction();

	const onSubmit = (transactionData: UpdateTransactionFormValues): void => {
		updateTransaction(
			{ id: transactionId, payload: transactionData },
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
			onClick={editTransactionForm.handleSubmit(onSubmit)}
			disabled={!editTransactionForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cambios
				</>
			)}
		</Button>
	);
};
