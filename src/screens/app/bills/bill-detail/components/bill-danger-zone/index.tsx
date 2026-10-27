import { TriangleAlert } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Alert } from "@/components/design-system/primitives/alert";
import { CancelBill } from "./components/cancel-bill";
import { DeleteBillPermanent } from "./components/delete-bill-permanent";

type BillDangerZoneProps = {
	service: RecurringExpense;
};

export const BillDangerZone = ({ service }: BillDangerZoneProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<Alert
				variant={"destructive"}
				icon={TriangleAlert}
				title="Zona de peligro"
				action={
					<div className="flex flex-row gap-2">
						<CancelBill service={service} />
						<DeleteBillPermanent service={service} />
					</div>
				}
			>
				<p>
					Cancelar desactiva el servicio pero mantiene el historial. Eliminar permanentemente borra
					el registro sin recuperación.
				</p>
			</Alert>
		</ScaleFadeIn>
	);
};
