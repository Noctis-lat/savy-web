import { create } from "zustand";
import { ROUTES } from "@/app/router/routes";

type RoutesController = {
	breadcrumbsConfig: BreadcrumbItemConfig[];
	setBreadcrumbsConfig: (config: BreadcrumbItemConfig[]) => void;
};

export const useRoutesController = create<RoutesController>()((set) => ({
	breadcrumbsConfig: [{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Configuración" }],
	setBreadcrumbsConfig: (config: BreadcrumbItemConfig[]): void => {
		set({ breadcrumbsConfig: config });
	},
}));
