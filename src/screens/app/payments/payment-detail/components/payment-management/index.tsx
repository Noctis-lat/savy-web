import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { RecurringExpenseManagement } from "@/components/recurring-expenses/recurring-expense-management";
import { recurringExpenseKeys } from "@/content/services";
import { useCancelRecurringExpense } from "@/hooks/recurring-expenses/useCancelRecurringExpense";
import { useDeleteRecurringExpensePermanent } from "@/hooks/recurring-expenses/useDeleteRecurringExpensePermanent";

type PaymentManagementProps = {
	recurringExpense: RecurringExpense;
};

export const PaymentManagement = ({
	recurringExpense,
}: PaymentManagementProps): React.ReactElement => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: deactivatePayment, isPending: isDeactivating } = useCancelRecurringExpense();
	const { mutate: deletePaymentPermanent, isPending: isDeleting } =
		useDeleteRecurringExpensePermanent();

	const handleDeactivate = () => {
		deactivatePayment(recurringExpense.id, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [recurringExpenseKeys.recurringExpense, recurringExpense.id],
				});
			},
		});
	};

	const handleDelete = () => {
		deletePaymentPermanent(recurringExpense.id, {
			onSuccess: () => {
				navigate(ROUTES.APP.PAYMENTS.ROOT);
			},
		});
	};

	return (
		<RecurringExpenseManagement
			name={recurringExpense.name}
			entityLabel="gasto recurrente"
			isActive={recurringExpense.isActive}
			onDeactivate={handleDeactivate}
			onDelete={handleDelete}
			isDeactivating={isDeactivating}
			isDeleting={isDeleting}
		/>
	);
};
