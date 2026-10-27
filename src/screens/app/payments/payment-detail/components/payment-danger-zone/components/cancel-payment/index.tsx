import { Ban } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useCancelRecurringExpense } from "@/hooks/recurring-expenses/useCancelRecurringExpense";

type CancelPaymentProps = {
	recurringExpense: RecurringExpense;
};

export const CancelPayment = ({ recurringExpense }: CancelPaymentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: cancelRecurringExpense, isPending } = useCancelRecurringExpense();

	const handleCancel = () => {
		cancelRecurringExpense(recurringExpense.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.PAYMENTS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Cancelar: ${recurringExpense.name}`}
			description="Cancelar desactiva este gasto recurrente. Se mantendrá el historial pero no se generarán nuevos cobros."
			confirmText="Cancelar gasto"
			variant="default"
			onConfirm={handleCancel}
			onOpenChange={setOpen}
			open={open}
			disabled={isPending}
			loading={isPending}
		>
			<Button variant={"outline"}>
				<Ban />
				Cancelar
			</Button>
		</ConfirmDialog>
	);
};
