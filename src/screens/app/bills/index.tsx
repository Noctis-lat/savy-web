import { Receipt } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";

export const Bills = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Servicios" }]}
		>
			<Empty
				icon={Receipt}
				title="Sin servicios"
				description="Registra tus servicios para llevar control de tus recibos."
			/>
		</Screen>
	);
};
