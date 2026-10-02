import { FolderOpen } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { useRoutesController } from "@/storage/settings/routesController";

export const Categories = (): React.ReactElement => {
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Categorías" },
		]);
	}, [setBreadcrumbsConfig]);

	return (
		<Empty
			icon={FolderOpen}
			title="Próximamente"
			description="Esta sección está en desarrollo."
		/>
	);
};
