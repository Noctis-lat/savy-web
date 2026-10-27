import { Ban } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useCancelSubscription } from "@/hooks/subscriptions/useCancelSubscription";

type CancelSubscriptionProps = {
	subscription: RecurringExpense;
};

export const CancelSubscription = ({
	subscription,
}: CancelSubscriptionProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { mutate: cancelSubscription, isPending } = useCancelSubscription();

	const handleCancel = () => {
		cancelSubscription(subscription.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.SUBSCRIPTIONS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Cancelar: ${subscription.name}`}
			description="Cancelar desactiva esta suscripción. Se mantendrá el historial pero no se generarán nuevos cobros."
			confirmText="Cancelar suscripción"
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
