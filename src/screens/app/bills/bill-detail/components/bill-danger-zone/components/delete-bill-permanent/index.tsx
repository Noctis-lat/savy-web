import { Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteServicePermanent } from "@/hooks/services/useDeleteServicePermanent";

type DeleteBillPermanentProps = {
	service: RecurringExpense;
};

export const DeleteBillPermanent = ({ service }: DeleteBillPermanentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: deleteServicePermanent, isPending } = useDeleteServicePermanent();

	const handleDelete = () => {
		deleteServicePermanent(service.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.BILLS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Eliminar permanentemente: ${service.name}`}
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
