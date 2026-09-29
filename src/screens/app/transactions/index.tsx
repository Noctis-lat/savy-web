import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { Screen } from "@/components/design-system/primitives/screen";
import { CreateTransaction } from "@/components/transactions/create-transaction";

export const Transactions = (): React.ReactElement => {
	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Transacciones" }]}
			action={<CreateTransaction />}
		>
			<div></div>
		</Screen>
	);
};
