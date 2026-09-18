import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";
import { BankEdit } from "./bank-edit";

type BankDetailHeaderProps = {
	bank: Bank;
};

export const BankDetailHeader = ({ bank }: BankDetailHeaderProps): React.ReactElement => {
	return (
		<div className="flex items-center justify-between">
			<AppBreadcrumbs
				backRoute={ROUTES.APP.BANKS}
				config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: bank.name }]}
			/>
			<BankEdit bankId={bank.id} />
		</div>
	);
};
