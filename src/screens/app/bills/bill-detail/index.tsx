import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { EditBill } from "@/components/bills/edit-bill";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryService } from "@/hooks/services/useQueryService";
import { BillDangerZone } from "./components/bill-danger-zone";
import { BillDetails } from "./components/bill-details";
import { BillHeader } from "./components/bill-header";
import { BillSkeleton } from "./components/bill-skeleton";

export const BillDetail = (): React.ReactElement => {
	const { bill_id } = useParams<{ bill_id: string }>();
	const { service, isLoading } = useQueryService(bill_id);

	if (isLoading) {
		return <BillSkeleton />;
	}

	if (!service) {
		return (
			<Empty
				title="Sin información"
				description="El servicio que solicitaste no pudo ser encontrado."
				icon={FlagOff}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.BILLS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Servicios", href: ROUTES.APP.BILLS.ROOT },
				{ label: service.name },
			]}
			action={<EditBill recurringExpense={service} />}
		>
			<BillHeader service={service} />
			<BillDetails service={service} />
			<BillDangerZone service={service} />
		</Screen>
	);
};
