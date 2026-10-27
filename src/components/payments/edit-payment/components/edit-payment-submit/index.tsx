import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { recurringExpenseKeys } from "@/content/services";
import { useUpdateRecurringExpense } from "@/hooks/recurring-expenses/useUpdateRecurringExpense";
import type { UpdateRecurringExpenseFormValues } from "@/schemas/recurring-expenses/updateRecurringExpenseSchema";

type EditPaymentSubmitProps = {
	recurringExpenseId: string;
	onSuccess?: () => void;
};

export const EditPaymentSubmit = ({
	recurringExpenseId,
	onSuccess,
}: EditPaymentSubmitProps): React.ReactElement => {
	const editPaymentForm = useFormContext<UpdateRecurringExpenseFormValues>();
	const { mutate: updateRecurringExpense, isPending } = useUpdateRecurringExpense();
	const queryClient = useQueryClient();

	const onSubmit = (data: UpdateRecurringExpenseFormValues): void => {
		const payload: UpdateRecurringExpensePayload = {
			name: data.name,
			amount: data.amount,
			frequency: data.frequency,
			billingDays:
				data.frequency === "BIWEEKLY"
					? [data.billingDay, data.billingDay2].filter((day): day is number => day !== undefined)
					: data.billingDay !== undefined
						? [data.billingDay]
						: undefined,
			accountId: data.accountId,
			categoryId: data.categoryId || undefined,
			url: data.url || undefined,
			color: data.color || undefined,
			icon: data.icon || undefined,
		};

		updateRecurringExpense(
			{ id: recurringExpenseId, payload },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [recurringExpenseKeys.recurringExpense, recurringExpenseId],
					});
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editPaymentForm.handleSubmit(onSubmit)}
			disabled={!editPaymentForm.formState.isValid || isPending}
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
