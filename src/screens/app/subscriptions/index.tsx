import { Repeat } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";

export const Subscriptions = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Suscripciones" }]}
		>
			<Empty
				icon={Repeat}
				title="Sin suscripciones"
				description="Registra tus suscripciones para controlar los pagos recurrentes."
			/>
		</Screen>
	);
};
