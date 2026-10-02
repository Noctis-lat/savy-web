import type React from "react";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/routes";
import { useRoutesController } from "@/storage/settings/routesController";

export const Incomes = (): React.ReactElement => {
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Fuentes de ingreso" },
		]);
	}, [setBreadcrumbsConfig]);

	return <div>Incomes</div>;
};
