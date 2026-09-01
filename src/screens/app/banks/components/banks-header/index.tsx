import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";

export const BanksHeader = (): React.ReactElement => {
	return (
		<div className="flex items-center justify-between">
			<AppBreadcrumbs
				backRoute={ROUTES.APP.DASHBOARD}
				config={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Bancos" }]}
			/>
		</div>
	);
};
