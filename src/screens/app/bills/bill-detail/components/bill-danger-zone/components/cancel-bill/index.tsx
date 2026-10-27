import { Ban } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useCancelService } from "@/hooks/services/useCancelService";

type CancelBillProps = {
	service: RecurringExpense;
};

export const CancelBill = ({ service }: CancelBillProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: cancelService, isPending } = useCancelService();

	const handleCancel = () => {
		cancelService(service.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.BILLS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Cancelar: ${service.name}`}
			description="Cancelar desactiva este servicio. Se mantendrá el historial pero no se generarán nuevos cobros."
			confirmText="Cancelar servicio"
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
