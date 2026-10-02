import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Screen } from "@/components/design-system/primitives/screen";
import { useRoutesController } from "@/storage/settings/routesController";

export const Settings = (): React.ReactElement => {
	const { breadcrumbsConfig } = useRoutesController();

	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={breadcrumbsConfig}
		>
			<div></div>
		</Screen>
	);
};
