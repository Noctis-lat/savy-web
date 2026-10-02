import { User } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { useRoutesController } from "@/storage/settings/routesController";

export const Profile = (): React.ReactElement => {
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Perfil" },
		]);
	}, [setBreadcrumbsConfig]);

	return (
		<Empty
			icon={User}
			title="Próximamente"
			description="Esta sección está en desarrollo."
		/>
	);
};
