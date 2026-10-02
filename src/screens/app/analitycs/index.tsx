import { TrendingUp } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";

export const Analitycs = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Estadísticas" }]}
		>
			<Empty
				icon={TrendingUp}
				title="Próximamente"
				description="Esta sección está en desarrollo."
			/>
		</Screen>
	);
};
