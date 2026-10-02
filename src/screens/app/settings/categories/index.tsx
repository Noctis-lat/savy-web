import type React from "react";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/routes";
import { useRoutesController } from "@/storage/settings/routesController";

export const Categories = (): React.ReactElement => {
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Categorias" },
		]);
	}, [setBreadcrumbsConfig]);

	return <div>Categories</div>;
};
