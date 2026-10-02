import { CreditCard } from "lucide-react";
import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";

export const Credits = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.ROOT}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Créditos" }]}
		>
			<Empty
				icon={CreditCard}
				title="Sin créditos"
				description="Agrega un crédito para hacer seguimiento de tus pagos."
			/>
		</Screen>
	);
};
