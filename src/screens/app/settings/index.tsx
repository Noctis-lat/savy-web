import { FolderOpen, User, Wallet } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { AppNavigationTabs } from "@/components/design-system/patterns/navigation/app-navigation-tabs";
import { Screen } from "@/components/design-system/primitives/screen";
import { useRoutesController } from "@/storage/settings/routesController";

const SETTINGS_TABS = [
	{ label: "Perfil", value: ROUTES.APP.SETTINGS.PROFILE, icon: User },
	{ label: "Categorías", value: ROUTES.APP.SETTINGS.CATEGORIES, icon: FolderOpen },
	{ label: "Fuentes de ingreso", value: ROUTES.APP.SETTINGS.INCOME_SOURCES, icon: Wallet },
] as const;

export const Settings = (): React.ReactElement => {
	const { breadcrumbsConfig } = useRoutesController();

	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={breadcrumbsConfig}
		>
			<AppNavigationTabs
				config={SETTINGS_TABS}
				defaultValue={ROUTES.APP.SETTINGS.PROFILE}
			/>
		</Screen>
	);
};
