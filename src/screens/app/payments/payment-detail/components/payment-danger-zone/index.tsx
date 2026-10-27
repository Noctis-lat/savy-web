import { TriangleAlert } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Alert } from "@/components/design-system/primitives/alert";
import { CancelPayment } from "./components/cancel-payment";
import { DeletePaymentPermanent } from "./components/delete-payment-permanent";

type PaymentDangerZoneProps = {
	recurringExpense: RecurringExpense;
};

export const PaymentDangerZone = ({
	recurringExpense,
}: PaymentDangerZoneProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<Alert
				variant={"destructive"}
				icon={TriangleAlert}
				title="Zona de peligro"
				action={
					<div className="flex flex-row gap-2">
						<CancelPayment recurringExpense={recurringExpense} />
						<DeletePaymentPermanent recurringExpense={recurringExpense} />
					</div>
				}
			>
				<p>
					Cancelar desactiva el gasto recurrente pero mantiene el historial. Eliminar
					permanentemente borra el registro sin recuperación.
				</p>
			</Alert>
		</ScaleFadeIn>
	);
};
