import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateBill } from "@/components/bills/create-bill";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryServices } from "@/hooks/services/useQueryServices";
import { BillsFilters } from "./components/bills-filters";
import { BillsKpis } from "./components/bills-kpis";
import { BillsList } from "./components/bills-list";
import { BillsSkeleton } from "./components/bills-skeleton";

export const Bills = (): React.ReactElement => {
	const { servicesInfo, total, isLoading } = useQueryServices();

	if (isLoading) {
		return <BillsSkeleton />;
	}

	if (!servicesInfo) {
		return (
			<Empty
				title="Sin servicios para mostrar"
				description="No hay servicios para mostrar"
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Servicios" }]}
			action={<CreateBill mode="button" />}
		>
			<BillsKpis
				info={servicesInfo}
				total={total}
			/>
			<BillsFilters />
			<BillsList />
		</Screen>
	);
};
