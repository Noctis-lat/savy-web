import { Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteRecurringExpensePermanent } from "@/hooks/recurring-expenses/useDeleteRecurringExpensePermanent";

type DeletePaymentPermanentProps = {
	recurringExpense: RecurringExpense;
};

export const DeletePaymentPermanent = ({
	recurringExpense,
}: DeletePaymentPermanentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: deleteRecurringExpensePermanent, isPending } =
		useDeleteRecurringExpensePermanent();

	const handleDelete = () => {
		deleteRecurringExpensePermanent(recurringExpense.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.PAYMENTS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Eliminar permanentemente: ${recurringExpense.name}`}
			description="Esta acción elimina el registro por completo y no se puede deshacer."
			confirmText="Eliminar"
			variant="destructive"
			onConfirm={handleDelete}
			onOpenChange={setOpen}
			open={open}
			disabled={isPending}
			loading={isPending}
		>
			<Button variant={"destructive"}>
				<Trash2 />
				Eliminar
			</Button>
		</ConfirmDialog>
	);
};
