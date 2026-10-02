import { CalendarClock } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";

export const Payments = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Gastos recurrentes" },
			]}
		>
			<Empty
				icon={CalendarClock}
				title="Sin gastos recurrentes"
				description="Registra tus gastos recurrentes para anticipar tus pagos."
			/>
		</Screen>
	);
};
