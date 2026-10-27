import { Save } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateRecurringExpense } from "@/hooks/recurring-expenses/useCreateRecurringExpense";
import type { CreateRecurringExpenseFormValues } from "@/schemas/recurring-expenses/createRecurringExpenseSchema";

type CreatePaymentSubmitProps = {
	onSuccess?: () => void;
	onPendingChange?: (isPending: boolean) => void;
};

export const CreatePaymentSubmit = ({
	onSuccess,
	onPendingChange,
}: CreatePaymentSubmitProps): React.ReactElement => {
	const createPaymentForm = useFormContext<CreateRecurringExpenseFormValues>();
	const { mutate: createRecurringExpense, isPending } = useCreateRecurringExpense();

	useEffect(() => {
		onPendingChange?.(isPending);
	}, [isPending, onPendingChange]);

	useEffect(() => () => onPendingChange?.(false), [onPendingChange]);

	const onSubmit = (data: CreateRecurringExpenseFormValues): void => {
		const payload: CreateRecurringExpensePayload = {
			name: data.name,
			amount: data.amount,
			frequency: data.frequency,
			billingDays:
				data.frequency === "BIWEEKLY" && data.billingDay2 !== undefined
					? [data.billingDay, data.billingDay2]
					: [data.billingDay],
			type: data.type,
			accountId: data.accountId,
			categoryId: data.categoryId || undefined,
			url: data.url || undefined,
			color: data.color || undefined,
			icon: data.icon || undefined,
		};

		createRecurringExpense(payload, { onSuccess: () => onSuccess?.() });
	};

	return (
		<Button
			type="button"
			onClick={createPaymentForm.handleSubmit(onSubmit)}
			disabled={!createPaymentForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar gasto recurrente
				</>
			)}
		</Button>
	);
};
