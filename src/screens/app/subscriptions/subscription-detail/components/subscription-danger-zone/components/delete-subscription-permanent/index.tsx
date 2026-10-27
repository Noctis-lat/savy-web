import { Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteSubscriptionPermanent } from "@/hooks/subscriptions/useDeleteSubscriptionPermanent";

type DeleteSubscriptionPermanentProps = {
	subscription: RecurringExpense;
};

export const DeleteSubscriptionPermanent = ({
	subscription,
}: DeleteSubscriptionPermanentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: deleteSubscriptionPermanent, isPending } = useDeleteSubscriptionPermanent();

	const handleDelete = () => {
		deleteSubscriptionPermanent(subscription.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Eliminar permanentemente: ${subscription.name}`}
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
