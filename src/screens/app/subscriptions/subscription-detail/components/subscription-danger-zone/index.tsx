import { TriangleAlert } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Alert } from "@/components/design-system/primitives/alert";
import { CancelSubscription } from "./components/cancel-subscription";
import { DeleteSubscriptionPermanent } from "./components/delete-subscription-permanent";

type SubscriptionDangerZoneProps = {
	subscription: RecurringExpense;
};

export const SubscriptionDangerZone = ({
	subscription,
}: SubscriptionDangerZoneProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<Alert
				variant={"destructive"}
				icon={TriangleAlert}
				title="Zona de peligro"
				action={
					<div className="flex flex-row gap-2">
						<CancelSubscription subscription={subscription} />
						<DeleteSubscriptionPermanent subscription={subscription} />
					</div>
				}
			>
				<p>
					Cancelar desactiva la suscripción pero mantiene el historial. Eliminar permanentemente
					borra el registro sin recuperación.
				</p>
			</Alert>
		</ScaleFadeIn>
	);
};
